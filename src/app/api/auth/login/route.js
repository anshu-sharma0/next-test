import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        await dbConnect();

        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Email and password are required' }), {
                status: 400,
            });
        }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
                status: 401,
            });
        }

        user.action = 'login';
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const tokenCookie = `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; ${
            process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        }`;

        const emailCookie = `email=${encodeURIComponent(user.email)}; Path=/; Max-Age=3600; SameSite=Strict; ${
            process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        }`;

        const roleCookie = `role=${encodeURIComponent(user.role)}; Path=/; Max-Age=3600; SameSite=Strict; ${
            process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        }`;

        return new Response(
            JSON.stringify({
                message: 'Login successful',
                data: { role: user.role, name: user.name, email: user.email },
            }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': [tokenCookie, emailCookie, roleCookie],
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Login API Error:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}
