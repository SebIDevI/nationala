import React from "react";
import Image from "next/image";
import storage from "@/public/storage.jpg";
import Accrd from "../Accrd";
import { BsCheck2 } from "react-icons/bs";

const list = [
  "React",
  "TypeScript",
  "NextJS",
  "Prisma",
  "Stripe",
  "Tailwind",
  "DaisyUI",
  "Shadcn/ui",
  "Framer Motion",
  "Zustand",
];

function Section1() {
  return (
    <>
      <div className="w-full bg-base-300 p-10 py-12">
        <div className="w-1/2 mx-auto text-center">
          <span className="relative py-2 uppercase text-sm before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-2/3 before:h-full before:border-b-2 before:border-accent-focus">
            The concept
          </span>
          <h4 className="font-gothamBlack uppercase text-4xl py-6">
            your deposit at your disposal
          </h4>
          <p className="font-gothamBook">
            THE SPARROW Deposit, a new experience and inovative way of managing
            your <span className="font-gothamBlack">storage</span>. This product
            will save you <span className="font-gothamBlack">time</span>{" "}
            replaced with only a few clicks.
          </p>
          <Accrd
            nume="Is it accessible?"
            descriere="Yes. It has a very simple design and an easy to manage interface."
          />
          <Accrd
            nume="What if my warehouse is too complex?"
            descriere="There is no warehouse too complex for our app. It is configured to match with your warehouse configuration."
          />
          <Accrd
            nume="What technologies does it use?"
            lista={[
              list.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <BsCheck2 className="text-accent" /> {item}{" "}
                </div>
              )),
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default Section1;
