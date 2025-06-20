import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, role } = body;

    if (!name || !role) {
      return new Response(JSON.stringify({ error: 'Name and role are required' }), {
        status: 400,
      });
    }

    const userName = await User.findOne({ name });
    if (userName) {
      return new Response(JSON.stringify({ error: 'User already exists', status: 400 }), {
        status: 400,
      });
    }

    const users = await User.find();
    const nextId = users.length + 1

    const user = new User({
      id: nextId,
      name,
      role,
    });

    await user.save();

    return new Response(JSON.stringify({ message: 'User added successfully', id: nextId, status: 200 }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
