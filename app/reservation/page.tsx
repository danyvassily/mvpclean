import { redirect } from 'next/navigation'

/**
 * Redirection de /reservation vers /evenements/organiser
 * Cette page a été remplacée par la page "Organiser votre événement"
 */
export default function ReservationRedirect() {
  redirect('/evenements/organiser')
}
