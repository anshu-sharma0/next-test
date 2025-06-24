import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return new Response(JSON.stringify({
      role: decoded.role,
      email: decoded.email,
      name: decoded.name
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
    })
  }
}
