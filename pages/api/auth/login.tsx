// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, psw } = req.body;

  if (username === 'd' && psw === '1') {
    let JWTSession = jwt.sign(
      { username: username, expiresIn: '1h', algorithm: 'RS256' },
      process.env.PRIVATE_KEY
    );

    const serialized = serialize('JWTSession', JWTSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);

    res.status(200).json({ success: true });
  } else {
    res.status(401).json({
      error: 'Invalid username or password',
    });
  }
}
