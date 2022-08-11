// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handlerLogin(req: NextApiRequest, res: NextApiResponse) {
  //We read the body from the request
  const { username, psw } = req.body;

  // If the username and password are correct, we create a jwt token
  if (username === 'd' && psw === '1') {
    let JWTSession = jwt.sign(
      { username: username, expiresIn: '1h', algorithm: 'RS256' },
      process.env.PRIVATE_KEY
    );

    //We set the jwt token in the cookie
    const serialized = serialize('JWTSession', JWTSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
      path: '/',
    });
    
    // We set the cookie in the header
    res.setHeader('Set-Cookie', serialized);

    res.status(200).json({ success: true });
  } else {
    res.status(401).json({
      error: 'Invalid username or password',
    });
  }
}
