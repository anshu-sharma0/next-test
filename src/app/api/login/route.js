import dbConnect from '../../lib/mongoose';
import User from '../../models/User';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, action } = body;

        const user = await User.findOne({ name });
        if (user) {
            user.action = action;
            await user.save();

            return new Response(JSON.stringify({ message: 'success', status: 200, data: user }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ message: 'invalid user', status: 403 }), {
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
