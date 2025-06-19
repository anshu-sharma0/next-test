import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
      });
    }

    const user = await User.findOne({ name }).lean();

    if (user && user.role === 'admin') {
      return new Response(JSON.stringify({ message: 'success', status: 200 }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'invalid role', status: 403 }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error('Error checking user role:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
