import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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

  if (!body.nume) {
    return res.status(400).json({ message: "Nume invalid" });
  }

  const check = await prisma.productApp.findFirst({
    where: { cod: body.cod },
  });

  if (check) {
    return res.status(400).json({ message: "Codul exista deja" });
  }

  const empl = await prisma.employer.findFirst({
    where: {
      id: body.user.userId,
    },
  });
  const getProd = await prisma.order.findFirst({
    where: { userId: (await empl?.userId) || undefined },
    include: {
      products: true,
    },
  });

  const prod = await getProd?.products[0].id;

  const newEm = await prisma.productApp.create({
    data: {
      nume: body.nume,
      cod: body.cod,
      productId: await prod,
    },
  });
  res.status(200).json(newEm);
}
