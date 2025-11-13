import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Le matcher dans la config ci-dessous s'occupe déjà de filtrer
  // les chemins pour les assets statiques, les images, et les routes d'API.
  // Toute logique de middleware (ex: authentification, redirection) peut être placée ici.
  // Pour l'instant, nous laissons passer toutes les requêtes qui correspondent au matcher.
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - files with extensions (png, jpg, jpeg, gif, webp, svg, ico, woff, woff2, ttf, eot)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)$).*)',
  ],
}

