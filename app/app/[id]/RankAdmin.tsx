"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Lottie from "@/app/components/app/Lottie";
import Chart from "@/app/components/app/Chart";
import QRCode from "qrcode";
import Image from "next/image";

type userFetchedType = {
  id: string | null;
  userId: string | null;
  name: string | null;
  password: string | null;
  email: string;
  rank: number;
};
type productsType = {
  length?: ReactNode;
  map(
    arg0: (product: productType, index: number) => JSX.Element
  ): React.ReactNode;
  productType?: productType[];
};

type productType = {
  id: string | null;
  nume: string | null;
  cod: string | null;
  pos: string | null;
};

type grafType = {
  id: string | null;
  nume?: string | null;
  total?: number | null;
  totalEst: number | null;
  employerId: string | null;
};

function RankAdmin({
  userFetched,
  products,
  empNr,
  graf,
}: {
  userFetched: userFetchedType;
  products: productsType;
  empNr: number;
  graf: grafType[];
}) {
  const [posP, setPosP] = useState("-1");
  const [codP, setCodP] = useState("");

  const [src, setSrc] = useState<string>("");
  const generate = () => {
    QRCode.toDataURL(`${process.env.NEXTAUTH_URL}/app/scan?id=${codP}`).then(
      setSrc
    );
  };

  return (
    <div className="pt-20 flex flex-col lg:flex-row-reverse h-full">
      <>
        <div className="w-full py-8">
          <div className="border-l border-base-300 h-full flex flex-col justify-center text-center lg:text-inherit w-full">
            <h1 className="text-3xl font-thin py-4">
              Salutare,{" "}
              <span className="font-bold">
                {userFetched.name
                  ? userFetched.name
                  : "Adauga nume din setari!"}
              </span>
            </h1>
            <Link href={{ pathname: "/app/setari" }}>Setari</Link>
            <ul className="list-disc list-inside font-thin text-lg">
              <li>
                Nr. muncitori: <span className="font-bold">{empNr}</span>
              </li>
              <li>
                Nr. produse:{" "}
                <span className="font-bold">{products.length}</span>
              </li>
              <li>
                Adaugă muncitor:{" "}
                <Link
                  href="/app/muncitor"
                  className="font-bold underline hover:text-orange-500 transition"
                >
                  aici
                </Link>
              </li>
              <li>
                Adaugă administrator:{" "}
                <Link
                  href="/app/admin"
                  className="font-bold underline hover:text-orange-500 transition"
                >
                  aici
                </Link>
              </li>
              <li>
                Adaugă produs:{" "}
                <Link
                  href="/app/product"
                  className="font-bold underline hover:text-orange-500 transition"
                >
                  aici
                </Link>
              </li>
            </ul>
            <div className="bg-transparent rounded-md">
              <Lottie />
            </div>
          </div>
        </div>
        <div className="w-full p-8">
          <div className="bg-base-200 border-2 border-base-200 min-w-[100px] rounded-md">
            <div className="text-xl font-bold flex flex-col items-center justify-center h-full py-16">
              <h3 className="uppercase">unde este?</h3>
              <p className="font-normal uppercase text-base">
                {/* ⬅️Alege un produs din lista aceasta */}
                {posP == "-1" ? "Alege un produs" : `Camera ${posP}`}
              </p>
            </div>
          </div>
          <Chart />
          <div className="w-full">
            <div className="bg-base-200 border-2 border-base-200 w-full rounded-md flex flex-col justify-center items-center py-20 my-8">
              {codP !== "" ? (
                src ? (
                  <Image
                    src={src}
                    alt="QR code"
                    width={140}
                    height={140}
                    className="pb-4"
                  />
                ) : (
                  ""
                )
              ) : src ? (
                <p className="font-normal uppercase pb-4">Alege un produs</p>
              ) : (
                ""
              )}
              <button
                type="button"
                className="bg-base-100 px-3 py-2 rounded-lg"
                onClick={generate}
              >
                Generează cod
              </button>
            </div>
          </div>
        </div>
        <div className="w-full p-8">
          <table className="relative min-w-full overflow-y-scroll leading-normal text-base-content rounded-md">
            <thead className="relative w-full rounded-md">
              <tr className="w-full rounded-md">
                <th className="px-5 py-3 border-b-2 border-base-300 bg-base-200 text-left text-xs font-bold uppercase tracking-wider rounded-tl-md">
                  Nume produs
                </th>
                <th className="px-5 py-3 border-b-2 border-base-300 bg-base-200 text-left text-xs font-bold uppercase tracking-wider">
                  Cod
                </th>
                <th className="px-5 py-3 border-b-2 border-base-300 bg-base-200 text-left text-xs font-semibold uppercase tracking-wider rounded-tr-md"></th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(even)]:bg-base-200">
              {products.map((product: productType, index: number) => (
                <tr key={index}>
                  <td className="px-5 py-3">{product.nume}</td>
                  <td className="px-5 py-3">{product.cod}</td>
                  <td className="px-2 py-3">
                    <button
                      className="bg-orange-transparent border-2 border-accent hover:bg-accent hover:border-accent hover:text-accent-content px-3 py-1 text-accent rounded-full transition"
                      onClick={() => {
                        setPosP(product.pos!);
                        setCodP(product.cod!);
                      }}
                    >
                      Vezi poziția
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}

export default RankAdmin;
