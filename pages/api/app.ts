import { NextApiResponse, NextApiRequest } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { prisma } from "@/util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }
  const body = req.body;

  if (!body.email) {
    return res.status(400).json({ message: "Email invalid" });
  }

  const check = await prisma.employer.findFirst({
    where: { email: body.email },
  });

  if (check) {
    return res.status(400).json({ message: "Email-ul exista deja" });
  }

  const newEm = await prisma.employer.create({
    data: {
      email: body.email,
      userId: userSession.user?.id,
    },
  });
  res.status(200).json(newEm);
}
