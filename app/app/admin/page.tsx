"use client";

import React, { FormEvent, useState } from "react";
export default function Muncitor() {
  const [message, setMessage] = useState("");
  const [messageV, setMessageV] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
    };
    const JSONdata = JSON.stringify(data);

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch("/api/appAdmin", {
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
      setMessageV("Email-ul " + result.email + " a fost adaugat cu succes");
      setMessage("");
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="w-full md:w-[45%] bg-base-300 rounded-lg p-8 flex flex-col font-gotham"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-gothamBlack pb-3">Adauga admin</h2>
        {message ? (
          <span className="py-3 font-gothamBlack text-error">{message}</span>
        ) : messageV ? (
          <span className="py-5 font-gothamBlack text-success">{messageV}</span>
        ) : (
          ""
        )}
        <label htmlFor="email">Email-ul administratorului</label>
        <input
          name="email"
          type="email"
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
