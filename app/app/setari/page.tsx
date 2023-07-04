"use client";

import React from "react";
import { SwitchForm } from "@/app/components/app/Swithc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import { toast } from "@/app/components/ui/use-toast";
import { Input } from "@/app/components/ui/input";
import { useUserState } from "@/store";
import Link from "next/link";

const FormSchema = z.object({
  nume: z
    .string()
    .min(4, {
      message: "Numele trebuie sa aiba minim 4 caractere",
    })
    .max(18, {
      message: "Numele trebuie sa aiba maxim 18 caractere",
    })
    .optional(),
  est: z
    .string()
    .max(4, {
      message:
        "Numarul produselor estimate nu poate fi mai maire strict decat 10000",
    })
    .optional(),
  estNume: z
    .string()
    .max(4, {
      message:
        "Numarul produselor estimate nu poate fi mai maire strict decat 10000",
    })
    .optional(),
  checkpoint: z.boolean().default(false).optional(),
});

function Setari() {
  const [message, setMessage] = useState("");
  const [messageV, setMessageV] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      checkpoint: false,
    },
  });

  const user = useUserState();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const fetchData = await fetch("/api/setari", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nume: data.nume,
        user: user,
      }),
    });

    const res = await fetchData.json();
    if (res.message) {
      setMessage(res.message);
      setMessageV("");
    } else {
      setMessageV("Numele " + res.newName.name + " a fost schimbat cu succes");
      setMessage("");
    }
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-base-200 rounded-2xl p-8 w-full my-20 mx-8 lg:w-[40%]">
        <h2 className="text-5xl font-gothamBlack pb-4">Setari</h2>
        {message ? (
          <span className="py-3 font-gothamBlack text-error">{message}</span>
        ) : messageV ? (
          <span className="py-5 font-gothamBlack text-success">{messageV}</span>
        ) : (
          ""
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="nume"
              render={({ field }) => (
                <FormItem className="flex flex-col mb-2">
                  <FormLabel className="py-1 text-lg font-medium">
                    Nume
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-base-100 text-base-content p-3 text-lg rounded-lg outline-none ring-0 border-0"
                      placeholder="Ryan Reynolds"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-accent hover:bg-accent-focus text-accent-content"
              type="submit"
            >
              Salveaza
            </Button>
          </form>
        </Form>
        {/* <hr className="my-7" />
        <div className="flex items-center justify-between bg-base-100 border-l-4 border-neutral rounded-r-xl p-3 gap-3 mb-3">
          <span>Modifica produs</span>
          <Link href="/app/product/ud" className="flex gap-3">
            <FiSettings />
          </Link>
        </div>
        <div className="flex items-center justify-between bg-base-100 border-l-4 border-neutral rounded-r-xl p-3 gap-3 mb-3">
          <span>Modifica angajat</span>
          <Link href="/app/muncitor/ud" className="flex gap-3">
            <FiSettings />
          </Link>
        </div>
        <div className="flex items-center justify-between bg-base-100 border-l-4 border-neutral rounded-r-xl p-3 gap-3 mb-3">
          <span>Modifica angajat</span>
          <Link href="/app/admin/ud" className="flex gap-3">
            <FiSettings />
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Setari;
