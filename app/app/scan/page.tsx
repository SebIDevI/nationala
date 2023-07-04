"use client";
import React, { FormEvent, useState } from "react";
import { ScanParamTypes } from "@/types/SearchParamTypes";

function Scan({ searchParams }: ScanParamTypes) {
  const [messageV, setMessageV] = useState("");
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      desc: event.target.desc.value,
      id: searchParams.id,
    };
    const JSONdata = JSON.stringify(data);

    const res = await fetch("/api/emplUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    const response = await res.json();
    setMessageV(response.message);
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleForm}
        className="p-8 w-full md:w-1/3 rounded-xl bg-base-200 flex flex-col"
      >
        <span className="text-3xl text-center font-gothamBlack pb-2 text-base-content">
          Descrie cat mai detaliat locul in care se afla obiectul
        </span>
        {messageV ? (
          <span className="text-base text-center font-gothamBlack text-success">
            {messageV}
          </span>
        ) : (
          ""
        )}
        <input
          name="desc"
          type="text"
          className="bg-base-content p-2 px-3 rounded-lg my-4 outline-none text-base-300"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-focus transition text-accent-content rounded-md p-3"
        >
          Trimite
        </button>
      </form>
    </div>
  );
}

export default Scan;
