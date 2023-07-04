"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import DarkLight from "./DarkLight";
import userImg from "@/public/user.png";
import AccNav from "./Acc-nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <nav className="fixed w-full flex justify-between items-center px-8 py-5 z-50 bg-base-300">
      <Link href={"/"} className="hidden sm:flex">
        <h1 className="font-lobster text-4xl">The Sparrow</h1>
      </Link>
      <ul className="hidden sm:flex items-center gap-8">
        <li>
          <Link
            className="hover:bg-base-300 p-4 rounded-md hover:underline"
            href={"/dashboard"}
            onClick={() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
            }}
          >
            Dashboard
          </Link>
        </li>
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping className="text-2xl" />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* Dark mode */}
        <DarkLight />
        {/* If the user is not signed in */}
        {!user && (
          <li className="bg-primary text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={user?.image as string}
                alt={user?.name as string}
                width={26}
                height={26}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72"
              >
                <Link
                  className="hover:bg-base-300 p-4 rounded-md"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Dashboard
                </Link>
                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <Accordion
        type="single"
        collapsible
        className="sm:hidden w-full border-0"
      >
        <AccordionItem value="item-2" className="border-0">
          <AccordionTrigger className="font-lobster text-4xl">
            The Sparrow
          </AccordionTrigger>
          <AccordionContent className="text-left list-none">
            <li>
              <Link
                className="hover:bg-base-300 text-xl py-4 rounded-md hover:underline"
                href={"/dashboard"}
                onClick={() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
              >
                Dashboard
              </Link>
            </li>
            {/* Toggle the cart */}
            <div className="flex gap-3 py-3">
              <li
                onClick={() => cartStore.toggleCart()}
                className="flex items-center text-3xl relative cursor-pointer"
              >
                <AiFillShopping className="text-2xl" />
                <AnimatePresence>
                  {cartStore.cart.length > 0 && (
                    <motion.span
                      animate={{ scale: 1 }}
                      initial={{ scale: 0 }}
                      exit={{ scale: 0 }}
                      className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
                    >
                      {cartStore.cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </li>
              {/* Dark mode */}
              <DarkLight />
              {/* If the user is not signed in */}
              {!user && (
                <li className="bg-primary text-white py-2 px-4 rounded-md">
                  <button onClick={() => signIn()}>Sign in</button>
                </li>
              )}
              {user && (
                <li>
                  <div className="dropdown dropdown-end cursor-pointer">
                    <Image
                      src={user?.image as string}
                      alt={user?.name as string}
                      width={26}
                      height={26}
                      className="rounded-full"
                      tabIndex={0}
                    />
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72"
                    >
                      <Link
                        className="hover:bg-base-300 p-4 rounded-md"
                        href={"/dashboard"}
                        onClick={() => {
                          if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                          }
                        }}
                      >
                        Dashboard
                      </Link>
                      <li
                        onClick={() => {
                          signOut();
                          if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                          }
                        }}
                        className="hover:bg-base-300 p-4 rounded-md"
                      >
                        Sign out
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
