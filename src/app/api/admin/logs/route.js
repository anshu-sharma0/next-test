import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import AuditLog from '../../../../models/AuditLog';
import { isAdmin } from '../../../lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(request) {
    const user = await isAdmin(request);
    if (!user) return NextResponse.json({ message: 'Forbidden: Admins only' }, { status: 403 });

    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');
        const role = searchParams.get('role');

        const filter = {};
        if (role) filter.role = role;

        const total = await AuditLog.countDocuments(filter);

        const logs = await AuditLog.find(filter)
            .sort({ timestamp: -1 })
            .skip(offset)
            .limit(limit)
            .select('-__v');

        return NextResponse.json({ total, limit, offset, data: logs });
    } catch (error) {
        console.error('Audit log fetch failed:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
  const user = await isAdmin(request);
  if (!user)
    return NextResponse.json({ message: 'Forbidden: Admins only' }, { status: 403 });

  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password, role, meta } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    if (!['viewer', 'editor', 'admin'].includes(role)) {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const existingUser = await AuditLog.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists', status: 409 },
        { status: 409 }
      );
    }

    // 🔒 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // ✅ Save the user securely
    const newUser = new AuditLog({
      name,
      email,
      password: hashedPassword,
      role,
      meta
    });

    await newUser.save();

    return NextResponse.json({ message: 'User created and audit logged', status: 201 }, { status: 201 });
  } catch (error) {
    console.error('Audit log creation failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
