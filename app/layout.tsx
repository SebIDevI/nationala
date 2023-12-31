import "./globals.css";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
import { Roboto, Lobster } from "next/font/google";
import { Toaster } from "@/app/components/ui/toaster";
import Gotham from "next/font/local";

//Definde main font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
});
const gotham = Gotham({
  src: "../public/fonts/GothamMedium.ttf",
  variable: "--font-gotham",
});
const gothamBlack = Gotham({
  src: "../public/fonts/Gotham-Black.otf",
  variable: "--font-gothamBlack",
});
const gothamXLight = Gotham({
  src: "../public/fonts/Gotham-XLight.otf",
  variable: "--font-gothamXLight",
});
const gothamLight = Gotham({
  src: "../public/fonts/Gotham-Light.otf",
  variable: "--font-gothamLight",
});
const gothamThin = Gotham({
  src: "../public/fonts/Gotham-Thin.otf",
  variable: "--font-gothamThin",
});
const gothamBook = Gotham({
  src: "../public/fonts/GothamBook.ttf",
  variable: "--font-gothamBook",
});

export const metadata = {
  title: "The Sparrow",
  description: "The next big thing",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the user
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={` ${roboto.variable} ${lobster.variable} ${gotham.variable} ${gothamBlack.variable} ${gothamXLight.variable} ${gothamLight.variable} ${gothamThin.variable} ${gothamBook.variable} `}
    >
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
        <Toaster />
      </Hydrate>
    </html>
  );
}
