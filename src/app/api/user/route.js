import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return new Response(JSON.stringify({ role: decoded.role }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
    })
  }
}
