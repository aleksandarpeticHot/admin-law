import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function logout(req: NextApiRequest, res: NextApiResponse) {

  res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      path: '/'
    })
  )

  res.status(200).json({ message: 'Logged out' })
}