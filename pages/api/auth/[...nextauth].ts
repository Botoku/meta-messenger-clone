import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACAEBOOK_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin'
  }
}
export default NextAuth(authOptions)


// FACEBOOK_CLIENT_ID=257909603412547

// FACAEBOOK_CLIENT_SECRET=f9c5af3add8af29f173b01ea10a9bc7f




