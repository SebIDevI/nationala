"use client";

import React from "react";
import { useLottie } from "lottie-react";
import warehouse from "@/public/Lottie/warehouse.json";

function Lottie() {
  const options = {
    animationData: warehouse,
    loop: true,
    style: { width: "100%", height: "auto" },
  };
  const { View } = useLottie(options);
  return <div className="bg-transparent rounded-md">{View}</div>;
}

export default Lottie;
