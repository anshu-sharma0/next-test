import dbConnect from '../../../app/lib/mongoose';
import User from '../../../app/models/User';

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find().lean();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
    });
  }
}
