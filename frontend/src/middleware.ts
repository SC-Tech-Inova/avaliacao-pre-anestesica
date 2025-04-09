import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || request.headers.get('Authorization')?.replace('Bearer ', '')
const isAuthPage = request.nextUrl.pathname === '/'
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')

  // Don't redirect API routes
  if (isApiRoute) {
    return NextResponse.next()
  }

if (!token && !isAuthPage && request.nextUrl.pathname !== '/') {
return NextResponse.redirect(new URL('..home', request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/patientList', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
