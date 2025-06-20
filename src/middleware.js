import { NextResponse } from 'next/server';

export function middleware(request) {
  const role = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath = pathname.startsWith('/admin') || pathname === '/' || pathname === '/logs';

  if (isProtectedPath && !role) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
