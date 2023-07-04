import Stripe from "stripe";
import { prisma } from "@/util/prisma";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    res.status(400).send("Missing stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send("Webhook error" + err);
  }
  //   Handle diffrent types of events

  switch (event?.type) {
    case "payment_intent.created":
      const paymentIntent = event.data.object;
      console.log("Payment intent was created");
      break;
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        const order = await prisma.order.update({
          where: { paymentIntentID: charge.payment_intent },
          data: { status: "complete" },
        });
        const employer = await prisma.employer.create({
          data: {
            email: userSession.user?.email!,
            rank: 2,
            userId: userSession.user?.id,
          },
        });
        const admin = await prisma.user.update({
          where: { id: userSession.user?.id || undefined },
          data: { email: userSession.user?.email || undefined },
        });
      }
      break;
    default:
      console.log("Unhandled event type:" + event.type);
  }
  res.json({ recieved: true });
}
