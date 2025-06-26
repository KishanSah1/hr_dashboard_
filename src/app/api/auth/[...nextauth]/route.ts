// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         // Mock authentication - in production, validate against your database
//         if (credentials?.email === 'admin@hr.com' && credentials?.password === 'password') {
//           return {
//             id: '1',
//             email: 'admin@hr.com',
//             name: 'HR Admin',
//             role: 'admin'
//           };
//         }
//         return null;
//       }
//     })
//   ],
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   session: {
//     strategy: 'jwt',
//   },
// });

// // export { handler as GET, handler as POST };
// export default handler;

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@hr.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            email: "admin@hr.com",
            name: "HR Admin",
            role: "admin",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

// ✅ Fix: Export named HTTP method handlers
export const GET = handler;
export const POST = handler;
