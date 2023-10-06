```
npx create-next-app@latest
```

```
npm install next-auth
```

(Route Handlers (app/))[https://next-auth.js.org/configuration/initialization#route-handlers-app]

crate [app/api/auth/[...nextauth]/route.ts](./src/app/api/auth/[...nextauth]/route.ts) file

create a `.env.local` file and add the `NEXTAUTH_SECRET` environment variable:

```title=".env.local"
NEXTAUTH_SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
```

if use GitHub Auth go to https://github.com/settings/developers

Application name
next-auth-example

Homepage URL
http://127.0.0.1:3000

Authorization callback URL
http://127.0.0.1:3000/api/auth/callback/github

Generate a new client secret and copy to .env

```title=".env.local"
GITHUB_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

create options file

```title="app/api/auth/[...nextauth]/options.ts"
import type { NextAuthOptions as NextAuthConfig } from 'next-auth';

import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

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
} satisfies NextAuthConfig;
```

```title="app/api/auth/[...nextauth]/routs.ts"
import NextAuth from 'next-auth';
import { config } from './options';

const handler = NextAuth(config);

export { handler as GET, handler as POST };
```

test it work `http://localhost:3000/api/auth/providers`
test signin `http://localhost:3000/api/auth/signin`

add Middleware src/middleware.ts

```title="middleware.ts"
// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware"
```
