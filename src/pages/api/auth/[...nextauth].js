import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../db/prisma"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                cpf: { label: "CPF", type: "text", placeholder: "CPF" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                
                console.log(credentials);
                
                const getUser = await prisma.user.findUnique({
                    where: {
                        cpf: credentials.cpf,
                    }
                })
                
                if (getUser) {

                    var md5 = require('md5');
                                        
                    if (getUser.password === md5(credentials.password)) {

                        const userReturned = {
                            id: getUser.id,
                            name: getUser.name,
                            email: getUser.email,
                            image: getUser.image,
                            role: getUser.role,
                        }

                        return userReturned;
                    }


                } else {

                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }

                return null
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            
            return ({ ...token, ...user} )
        },
        session: ({ session, token, user }) => {
           
            
            session.user = token;

            return session;
        },
    },
    session: {
        maxAge: 12 * 60 * 60, // 12 horas
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: true,
    },
    pages: {
        signIn: "/login",
        signOut: '/login'
    },
}
export default NextAuth(authOptions)