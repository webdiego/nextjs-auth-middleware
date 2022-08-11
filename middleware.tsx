// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  // We read the jwt from the cookie
  const JWTSession = req.cookies.get('JWTSession');

  //If the request is from home page, we verify if the user is logged in otherwise we redirect to the index page
  if (req.nextUrl.pathname.includes('/home')) {
    if (JWTSession === undefined) {
      // return NextResponse.redirect(new URL('/auth/login', req.url));
      return NextResponse.redirect(new URL('/', req.url));
    }

    //We verify if the token is valid
    try {
      const { payload } = await jwtVerify(
        JWTSession,
        new TextEncoder().encode(process.env.PRIVATE_KEY)
      );

      //If the token is valid we redirect to the home page or anyway we validate the request of the user
      return NextResponse.next();

    } catch (e) {
      
      //If the token is not valid we redirect to the index page
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return NextResponse.next();
}

// Configuration of the middleware
// In the matcher we add the paths that we want to verify
export const config = {
  matcher: ['/home'],
};
