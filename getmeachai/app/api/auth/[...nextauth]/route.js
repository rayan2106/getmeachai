import NextAuth from 'next-auth'
import github from 'next-auth/providers/github';
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose';
import User from "@/models/User";
import Payment from '@/models/payment';
import dbConnect from '@/db/connectDB';

("GITHUB_ID:", process.env.GITHUB_ID); // 👈 Check this in terminal
("GITHUB_SECRET:", process.env.GITHUB_SECRET);

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: "read:user user:email",
                },
            },
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            ("USER:", user)
            ("ACCOUNT:", account)
            ("PROFILE:", profile)
            if (account.provider === "github") {
                await dbConnect();
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split('@')[0],
                        name: user.name || profile.name || profile.login || 'NoName',
                    })
                    await newUser.save();
                    user.name = newUser.username;
                }
            }
            return true;
        },
        async session({ session, user, token }) {
            await dbConnect();
            const dbuser = await User.findOne({ email: session.user.email })
            session.user.name = dbuser.username;
            return session;
        },
    }
})
export { handler as GET, handler as POST }