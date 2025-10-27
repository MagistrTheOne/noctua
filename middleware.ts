import createMiddleware from 'next-intl/middleware';
import { middlewareConfig } from './i18n';

export default createMiddleware(middlewareConfig);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|en)/:path*']
};
