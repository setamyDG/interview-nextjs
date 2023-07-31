// create NextAuth.js route with Google OAuth, Github OAuth
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    // add id to session user
    async session({ session, token }) {
      session = {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
        },
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
