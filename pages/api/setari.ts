import { NextApiResponse, NextApiRequest } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { prisma } from "@/util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userSession = await getServerSession(req, res, authOptions);
    //   if (!userSession?.user) {
    //     res.status(403).json({ message: "Not logged in" });
    //     return;
    //   }
    const body = req.body;
    if (body.nume) {
      const newName = await prisma.employer.update({
        where: {
          id: body.user.userId,
        },
        data: {
          name: body.nume,
        },
      });
      res.status(200).json({
        newName,
      });
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
