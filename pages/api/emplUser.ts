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
  const body = await req.body;
  if (!body.desc) {
    return res.status(400).json({ message: "Descriere invalida" });
  }
  const userFetched = await prisma.productApp.update({
    where: {
      cod: body.id,
    },
    data: {
      pos: body.desc,
    },
  });

  res.status(200).json({
    userFetched,
    message: "Pozitia a fost schimbata la: " + body.desc,
  });
}
