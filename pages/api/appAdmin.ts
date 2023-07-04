import { NextApiResponse, NextApiRequest } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { prisma } from "@/util/prisma";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions);
  // if (!userSession?.user) {
  //   res.status(403).json({ message: "Not logged in" });
  //   return;
  // }
  const body = req.body;

  if (!body.email) {
    return res.status(400).json({ message: "Email invalid" });
  }

  const check = await prisma.employer.findFirst({
    where: { email: body.email },
  });
  const check2 = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!body.password) {
    if (check || check2) {
      return res.status(400).json({ message: "Email-ul exista deja" });
    }
    const newEm = await prisma.employer.create({
      data: {
        email: body.email,
        userId: userSession?.user?.id,
        rank: 2,
      },
    });
    res.status(200).json(newEm);
  } else {
    const checkEm = await prisma.user.findUnique({
      where: { email: body.email },
    });
    const checkEmp = await prisma.employer.findUnique({
      where: { email: body.email },
    });
    if (checkEm && !checkEm.password) {
      const hashedPass = await bcrypt.hash(body.password, 10);
      const newPass = await prisma.user.update({
        where: { email: body.email || undefined },
        data: {
          password: hashedPass,
        },
      });
      const newEmp = await prisma.employer.create({
        data: {
          email: body.email,
          password: hashedPass,
          rank: 2,
          userId: userSession?.user?.id,
        },
      });
    } else if (checkEmp && !checkEmp.password) {
      const newPass = await prisma.employer.update({
        where: { email: body.email || undefined },
        data: {
          password: await bcrypt.hash(body.password, 10),
        },
      });
    } else {
      if (checkEm) {
        const serverPass = await prisma.employer.findUnique({
          where: { email: body.email },
        });
        const isPassOkEm = await bcrypt.compare(
          body.password,
          serverPass?.password!
        );
        if (isPassOkEm) {
          res.status(200).json({ employer: serverPass });
        }
      } else if (checkEmp) {
        const serverPass = await prisma.employer.findUnique({
          where: { email: body.email },
        });
        const isPassOkEmp = await bcrypt.compare(
          body.password,
          serverPass?.password!
        );
        if (isPassOkEmp) {
          res.status(200).json({ employer: serverPass });
        }
      }
    }
  }
}
