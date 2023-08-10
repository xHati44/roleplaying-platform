import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresDataSource from "@/PostgresDataSource";
import { User } from '../../../entity/User';


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn( user, account, profile ) {
      if (account.provider === 'google') {
        let dbUser = await PostgresDataSource.getRepository(User).findOne({
          where: { 
            googleId: profile.id }
        });

        if (!dbUser) {
          dbUser = new User();
          dbUser.googleId = profile.id;
          dbUser.name = user.name;
          dbUser.email = user.email;
          await PostgresDataSource.getRepository(User).save(dbUser);
        }

        user.id = dbUser.id;
      }
      return true;
    },

    async session(session, user) {
      // This callback is called whenever a session is accessed

      // Add the user's ID to the session
      session.userId = user.id;
      return session;
    },
  }
});