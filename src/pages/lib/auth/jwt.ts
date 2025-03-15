import { SignJWT, jwtVerify } from 'jose'

const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key';
const secret = new TextEncoder().encode(SECRET_KEY)

interface LoginRequestBody {
  email: string;
  password: string;
  id: string
}

export const generateToken = async (user: LoginRequestBody) => {
  return await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)
}

export const verifyToken = async (token: string) => {
  try {
    const response = await jwtVerify(token, secret)
    return response.payload
  } catch (error) {
    console.log('Error', error)
  }
}