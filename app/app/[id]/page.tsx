import { AppParamTypes } from "@/types/SearchParamTypes";

import Link from "next/link";

import { prisma } from "@/util/prisma";
import { useUserState } from "@/store";
import RankAdmin from "./RankAdmin";
import RankEmployer from "./RankEmployer";
export default async function App({ searchParams }: AppParamTypes) {
  const user = searchParams.userId;
  const getUserId = await prisma.employer.findFirst({
    where: {
      userId: user,
    },
  });

  const getProduct = await prisma.order.findFirst({
    where: { userId: (await getUserId?.userId) || undefined },
    include: { products: true },
  });

  const getEst = await prisma.grafic.findMany({
    where: { employerId: getUserId?.id },
  });

  const getProdApp = await prisma.productApp.findMany({
    where: { productId: await getProduct?.products[0].id },
  });

  if (user == null) {
    return (
      <div className="pt-20 w-full min-h-screen">
        <p className="m-4 p-4 bg-error text-error-content border-l-4 border-l-error-content rounded-r-lg">
          You are not connected!
        </p>
      </div>
    );
  }

  const userFetched = await prisma.employer.findUnique({
    where: {
      id: searchParams.userId,
    },
  });
  const allEmployers = await prisma.employer.findMany({
    where: { userId: userFetched?.userId },
  });

  return (
    <div className="min-h-screen">
      {userFetched?.rank == 2 ? (
        <RankAdmin
          userFetched={userFetched}
          products={getProdApp}
          empNr={allEmployers.length}
          graf={getEst}
        />
      ) : (
        <RankEmployer />
      )}
    </div>
  );
}

// * order?.products[0].id === searchParams.productId
// * user?.user?.id === searchParams.userId
