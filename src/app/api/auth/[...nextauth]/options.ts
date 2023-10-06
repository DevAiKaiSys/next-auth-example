import type { NextAuthOptions as NextAuthConfig } from 'next-auth';

import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    userRole?: 'admin';
  }
}

export const config = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = {
          id: '1',
          name: 'jsmith',
          email: 'jsmith@example.com',
          password: '1234',
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    },
  },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
// export function auth(
//   ...args:
//     | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, config);
// }
