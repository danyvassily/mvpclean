import { redirect } from "next/navigation";

/**
 * Redirection 301 de /savoir-faire/vigne vers /le-cycle-de-la-vigne
 */
export default function VigneRedirect() {
  redirect("/le-cycle-de-la-vigne/");
}
