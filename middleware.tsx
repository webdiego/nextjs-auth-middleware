// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

export async function middleware(req: NextRequest) {
  const JWTSession = req.cookies.get('JWTSession');

  if (req.nextUrl.pathname.includes('/home')) {
    if (JWTSession === undefined) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    try {
      const { payload } = await jwtVerify(
        JWTSession,
        new TextEncoder().encode(process.env.PRIVATE_KEY)
      );
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/home'],
};
