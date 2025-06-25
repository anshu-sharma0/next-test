import dbConnect from '../../../lib/mongoose';
import AuditLog from '../../../models/AuditLog';

export async function POST(req) {
  const email = req.cookies.get('email')?.value
  
  try {
    await dbConnect();

    // const { email } = await req.json();
    const user = await AuditLog.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid user', status: 403 }), {
        status: 403,
      });
    }
    user.action = 'logout';
    await user.save();

    const headers = new Headers();
    const cookieOptions = 'Path=/; Max-Age=0; SameSite=Strict; HttpOnly;';

    headers.append('Set-Cookie', `token=; ${cookieOptions}`);
    headers.append('Set-Cookie', `email=; Path=/; Max-Age=0; SameSite=Strict;`);
    headers.append('Set-Cookie', `role=; Path=/; Max-Age=0; SameSite=Strict;`);

    return new Response(JSON.stringify({ message: 'Logout successful', status: 200 }), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Error during logout:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
