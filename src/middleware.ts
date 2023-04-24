


import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token }) => (token ? true : false),
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/login',
      signOut: '/login'
    }
  }
);
