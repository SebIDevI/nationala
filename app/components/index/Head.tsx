"use client";
import React from "react";
import background from "../../../public/bg.jpg";
import { AiOutlineDown } from "react-icons/ai";

function Head() {
  return (
    <div
      className="relative h-screen w-full bg-gradient-to-r from-base-100 to-base-200 flex items-center pt-28"
      style={{ background: `url(${background})` }}
    >
      <div className="absolute w-full h-full"></div>
      <div className="w-full lg:w-[60%] mx-auto py-20 px-12 z-0 text-center">
        {/* <h1 className="relative text-xl sm:text-3xl lg:text-4xl pt-4 uppercase font-gothamXLight tracking-[1em] break-words">
          <span className="font-gotham text-sm uppercase tracking-[2em] me-[1em]">
            the
          </span>
          <span className="font-gothamBlack">S</span>parrow
        </h1> */}
        <h1 className="relative text-xl sm:text-3xl lg:text-4xl pt-4 uppercase font-gothamBlack tracking-[1em] break-words text-center">
          the Sparrow
        </h1>
        {/* <hr className="w-[60%] border-base-content animate-grow" /> */}
        <p className="py-8 text-center font-gothamXLight text-base sm:text-lg text-base-content w-full">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maxime
          assumenda corrupti cumque quis dolores neque iste modi exercitationem,
          cupiditate, nemo aliquam est architecto soluta, debitis corporis!
          Veritatis fugiat molestias in enim nemo vel, similique mollitia eius
          commodi delectus sed?
          <br />
        </p>
        <AiOutlineDown className="text-3xl mx-auto animate-arrow" />
      </div>
      {/* <div className="w-1/2 h-full relative"> */}

      {/* </div> */}
    </div>
  );
}

export default Head;
