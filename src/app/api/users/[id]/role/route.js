// app/api/users/[id]/role/route.js
import dbConnect from '../../../../lib/mongoose';
import User from '../../../../models/User';

export async function POST(request, context) {
  const currentUser = { role: 'admin' };

  if (currentUser.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const { role } = body;

  if (!['admin', 'editor', 'viewer'].includes(role)) {
    return new Response(JSON.stringify({ error: 'Invalid role' }), { status: 400 });
  }

  await dbConnect();

  const params = await context.params;
  const user = await User.findOne({ id: params.id });

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  user.role = role;
  await user.save();

  return new Response(
    JSON.stringify({ message: 'Role updated', user }),
    { status: 200 }
  );
}
