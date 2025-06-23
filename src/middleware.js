import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  if (!token) {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  let role = null
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    )
    role = payload.role
  } catch (err) {
    console.error('Invalid token:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/logs', request.url))
  }

  const adminPaths = ['/admin/addUser', '/admin/permissions']
  const permissionsPath = '/admin/permissions'
  const logsPath = '/logs'

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/logs', request.url))
  }

  if (role === 'viewer' && pathname !== logsPath) {
    return NextResponse.redirect(new URL('/logs', request.url))
  }

  if (role === 'editor' && pathname !== logsPath && pathname !== permissionsPath) {
    return NextResponse.redirect(new URL('/logs', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.png|api).*)',
  ],
}
