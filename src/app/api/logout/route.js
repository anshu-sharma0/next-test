import dbConnect from '../../lib/mongoose';
import User from '../../models/User';

export async function POST(req) {
    try {
        await dbConnect();
        const cookieHeader = req.headers.get('cookie');

        const name = cookieHeader
            ?.split('; ')
            .find(cookie => cookie.startsWith('name='))
            ?.split('=')[1];

        const user = await User.findOne({ name });

        if (user) {
            user.action = 'logout';
            await user.save();

            const headers = new Headers();
            headers.append('Set-Cookie', 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;');
            headers.append('Set-Cookie', 'name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;');

            return new Response(JSON.stringify({ message: 'Logout successful', status: 200 }), {
                status: 200,
                headers,
            });
        } else {
            return new Response(JSON.stringify({ message: 'Invalid user', status: 403 }), {
                status: 403,
            });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
        });
    }
}
