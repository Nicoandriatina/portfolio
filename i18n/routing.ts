import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always' // Force toujours le préfixe /en ou /fr
});
 
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);