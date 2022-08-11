import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handlerLogout(req: NextApiRequest, res: NextApiResponse) {
  //We read the jwt from the cookie
  const { JWTSession } = req.cookies;

  if (!JWTSession) {
    res.status(401).json({
      error: 'No token provided',
    });
  }

  //We verify if the token is valid
  try {
    verify(JWTSession, process.env.PRIVATE_KEY);

    const serialized = serialize('JWTSession', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    
    //We set the cookie to null
    res.setHeader('Set-Cookie', serialized);
    res.status(200).json('Logout success');
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: 'Invalid token',
    });
  }
}
