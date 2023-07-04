import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/util/prisma";
import Stripe from "stripe";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    //adaugă alt provider
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      });
      //Creez client stripe
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
        });
        //Actualizăm userul prisma cu id-ul clientului stripe
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
