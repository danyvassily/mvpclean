import { redirect } from "next/navigation";

/**
 * Page de redirection 301 pour /la-vigne vers /le-cycle-de-la-vigne
 */
export default function LaVigneRedirect() {
  redirect("/le-cycle-de-la-vigne/");
}

