import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresDataSource from "@/PostgresDataSource";
import { User } from '../../../entity/User';
import { Session } from "next-auth";


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(profile);
      if (account && account.provider === 'google' && profile) {
        let dbUser = await PostgresDataSource.getRepository(User).findOne({
          where: { 
            googleId: profile.sub }
        });

        if (!dbUser) {
          dbUser = new User();
          dbUser.googleId = profile?.sub?? '';
          dbUser.name = user?.name?? '';
          dbUser.email = user?.email?? '';
          await PostgresDataSource.getRepository(User).save(dbUser);
        }

        user.id = dbUser.id.toString();
      }
      return true;
    },
    
    async session(params) {
      const { session, user } = params;
      return {
        ...session,
        userId: user.id
      } as ExtendedSession;
    },
  }
});

interface ExtendedSession extends Session {
  userId: string; // or string, depending on the type of user.id
}