"use client";

import { useUserState } from "@/store";
import React, { FormEvent, useState } from "react";
export default function Muncitor() {
  const [message, setMessage] = useState("");
  const [messageV, setMessageV] = useState("");

  const user = useUserState();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      nume: event.target.nume.value,
      cod: event.target.cod.value,
      user: user,
    };
    const JSONdata = JSON.stringify(data);

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch("/api/appProdus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    const result = await response.json();
    if (result.message) {
      setMessage(result.message);
      setMessageV("");
    } else {
      setMessageV("Prosusul " + result.nume + " a fost adaugat cu succes");
      setMessage("");
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="w-full md:w-[45%] bg-base-300 rounded-lg p-8 flex flex-col font-gotham"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-gothamBlack pb-3">Adauga produs</h2>
        {message ? (
          <span className="py-3 font-gothamBlack text-error">{message}</span>
        ) : messageV ? (
          <span className="py-5 font-gothamBlack text-success">{messageV}</span>
        ) : (
          ""
        )}
        <label htmlFor="nume">Numele produsului</label>
        <input
          name="nume"
          type="text"
          className="p-2 my-2 rounded-md outline-none"
          required
        />
        <label htmlFor="cod">Codul produsului</label>
        <input
          name="cod"
          type="text"
          className="p-2 my-2 rounded-md outline-none"
        />
        <div>
          <button
            className="bg-accent p-1 px-4 text-accent-content text-lg font-bold w-auto rounded-lg hover:bg-accent-focus transition"
            type="submit"
          >
            Adauga
          </button>
        </div>
      </form>
    </div>
  );
}
