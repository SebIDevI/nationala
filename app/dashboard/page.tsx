"use client";

import { useUserState } from "@/store";
import React, { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
export default function Muncitor() {
  const [userId, setUserId] = useState("");

  const user = useUserState();
  useEffect(() => {
    setUserId(user.userId);
  }, [user.userId]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
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
    user.changeUserId(result.employer.id);

    // if (result.message) {
    // } else {
    // }
  };

  const logout = () => {
    user.changeUserId("");
  };
  // handleSubmit;
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {userId ? (
        <div className="bg-base-200 rounded-lg p-8 px-24 cursor-default overflow-hidden">
          <h1 className="font-gothamBlack text-3xl py-4">The sparrow</h1>
          <p className="text-xl py-4 text-center">Porneste aplicatia!</p>
          <div className="w-full flex text-center py-4">
            <Link
              className="w-full bg-neutral hover:bg-neutral-focus transition p-2 px-3 rounded-md"
              href={{
                pathname: `/app/${user.userId}`,
                query: {
                  userId: userId,
                },
              }}
            >
              Start!
            </Link>
          </div>
          <p className="text-sm text-center font-gothamBlack">sau</p>
          <button
            className="w-full bg-neutral text-neutral-content hover:bg-neutral-focus rounded-md transition mt-4 py-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          className="w-full md:w-[45%] bg-base-300 rounded-lg p-8 flex flex-col font-gotham"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-gothamBlack pb-2">Login</h2>
          <span className="py-2 font-gothamThin text-base-content">
            * daca accesati pentru prima data contul, parola pe care o puneti
            acum va ramane cea finala
          </span>
          {/* {message ? (
          <span className="py-3 font-gothamBlack text-error">{message}</span>
        ) : messageV ? (
          <span className="py-5 font-gothamBlack text-success">{messageV}</span>
        ) : (
          ""
        )} */}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="p-2 my-2 rounded-md outline-none"
          />
          <label htmlFor="password">Parola</label>
          <input
            name="password"
            type="password"
            className="p-2 my-2 rounded-md outline-none"
          />

          <div>
            <button
              className="bg-accent p-1 px-4 text-accent-content text-lg font-bold w-auto rounded-lg hover:bg-accent-focus transition"
              type="submit"
            >
              Intra in cont
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
