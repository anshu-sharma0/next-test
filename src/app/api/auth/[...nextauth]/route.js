import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // 🔐 Replace this with your real DB logic
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "123456"
        ) {
          return { id: 1, name: "Test User", email: "test@example.com" };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login", // ⬅️ Your custom login page
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET, // Set in .env.local
});

export { handler as GET, handler as POST };
