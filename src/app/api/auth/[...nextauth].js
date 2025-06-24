import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    
  ],
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
