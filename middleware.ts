import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);

export const config = {
  // Match uniquement les pages, pas les fichiers statiques
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/webpack-hmr).*)'
  ]
};