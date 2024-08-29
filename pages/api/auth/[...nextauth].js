import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { clientPromise } from '../../../lib/mongodb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db("GMC-ecommerce");
          const user = await db.collection('users').findOne({ email: credentials.email });

          console.log("Authorize function - Found user:", user ? "Yes" : "No");

          if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            console.log("Authorize function - Authentication failed");
            return null;
          }

          console.log("Authorize function - Authentication successful");
          return { id: user._id, email: user.email, name: user.name };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log("JWT callback:", { token, user });
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     console.log("Session callback:", { session, token });
  //     if (token) {
  //       session.user.id = token.id;
  //     }
  //     return session;
  //   },
  // },
  // debug: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
