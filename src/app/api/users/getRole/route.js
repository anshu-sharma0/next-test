import dbConnect from '../../../lib/mongoose';
import AuditLog from '../../../models/AuditLog';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');

  try {
    await dbConnect();

    let users;

    if (role) {
      users = await AuditLog.find({ role }).lean();
    } else {
      users = await AuditLog.find().lean();
    }

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
