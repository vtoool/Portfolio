import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ro'],
  defaultLocale: 'en',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
