"use client";

import { prisma } from "@/util/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React, { FormEvent } from "react";
import Router, { useRouter } from "next/router";
export default function Muncitor() {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
    };
    const JSONdata = JSON.stringify(data);

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch("/api/app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    const result = await response.json();
    alert(`Emailul ${result.email} a fost adaugat`);
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="w-full md:w-[45%] bg-base-300 rounded-lg p-8 flex flex-col font-gotham"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-gothamBlack pb-3">Adauga angajat</h2>
        <label htmlFor="email">Email-ul angajatului</label>
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
