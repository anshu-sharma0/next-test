import dbConnect from '../../../../lib/mongoose';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, role, password } = await req.json();

    if (!name || !email || !role || !password) {
      return new Response(JSON.stringify({ error: 'Name, role, and password are required' }), {
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      role,
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ message: 'User added successfully', status: 200, data: user }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error creating user:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
