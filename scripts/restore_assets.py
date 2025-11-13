#!/usr/bin/env python3
"""Restore LFS pointer assets by copying real files from reference folders."""

from __future__ import annotations

import os
import shutil
from dataclasses import dataclass
from typing import Dict, List

WORKSPACE_ROOT = os.getcwd()
PUBLIC_ROOT = os.path.join(WORKSPACE_ROOT, "public")
VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}
LFS_SIGNATURE = "version https://git-lfs.github.com/spec/v1"


def is_pointer_file(path: str) -> bool:
    try:
        if os.path.getsize(path) > 512:
            return False
        with open(path, "r", encoding="utf8", errors="ignore") as handle:
            head = handle.read(256)
            return LFS_SIGNATURE in head
    except OSError:
        return False


def collect_real_files(root: str) -> Dict[str, List[str]]:
    index: Dict[str, List[str]] = {}
    for dirpath, _, filenames in os.walk(root):
        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            if ext not in VALID_EXTENSIONS:
                continue
            full_path = os.path.join(dirpath, filename)
            size = os.path.getsize(full_path)
            if size <= 512:
                continue
            index.setdefault(filename, []).append(full_path)
    return index


@dataclass
class RestoreResult:
    pointer: str
    source: str | None
    reason: str


def choose_source(candidates: List[str]) -> str | None:
    if not candidates:
        return None
    if len(candidates) == 1:
        return candidates[0]
    page_candidates = [c for c in candidates if f"{os.sep}page{os.sep}" in c]
    if len(page_candidates) == 1:
        return page_candidates[0]
    if page_candidates:
        return page_candidates[0]
    return candidates[0]


def restore_assets() -> List[RestoreResult]:
    results: List[RestoreResult] = []
    real_files = collect_real_files(PUBLIC_ROOT)

    for dirpath, _, filenames in os.walk(PUBLIC_ROOT):
        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            if ext not in VALID_EXTENSIONS:
                continue
            pointer_path = os.path.join(dirpath, filename)
            if not is_pointer_file(pointer_path):
                continue

            candidates = real_files.get(filename, [])
            source = choose_source(candidates)
            if not source:
                results.append(RestoreResult(pointer_path, None, "Aucune source trouvée"))
                continue

            try:
                shutil.copy2(source, pointer_path)
                results.append(RestoreResult(pointer_path, source, "Copié"))
            except OSError as exc:
                results.append(RestoreResult(pointer_path, source, f"Erreur copie: {exc}"))
    return results


def main() -> None:
    print("🔍 Recherche des fichiers LFS à restaurer…")
    results = restore_assets()
    restored = [r for r in results if r.source and r.reason == "Copié"]
    missing = [r for r in results if r.source is None]
    failed = [r for r in results if r.source and r.reason != "Copié"]

    for entry in restored:
        rel_pointer = os.path.relpath(entry.pointer, WORKSPACE_ROOT)
        rel_source = os.path.relpath(entry.source, WORKSPACE_ROOT) if entry.source else "?"
        print(f"✅ {rel_pointer} <- {rel_source}")

    for entry in failed:
        rel_pointer = os.path.relpath(entry.pointer, WORKSPACE_ROOT)
        print(f"⚠️  {rel_pointer} : {entry.reason}")

    for entry in missing:
        rel_pointer = os.path.relpath(entry.pointer, WORKSPACE_ROOT)
        print(f"❌ {rel_pointer} : {entry.reason}")

    print("—" * 40)
    print(f"Total restaurés : {len(restored)}")
    print(f"Manquants : {len(missing)}")
    print(f"Erreurs : {len(failed)}")


if __name__ == "__main__":
    main()
