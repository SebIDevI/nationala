import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { TabsDemo } from "../app/Tabs";

function Section3() {
  return (
    <div>
      <h2 className="uppercase font-gothamBlack text-3xl mt-6 text-center">
        What is so special?
      </h2>
      <p className="text-center w-full pt-6 px-12 md:px-40 lg:px-64">
        This app was initially built with <b>Vite.js</b> and "translated" to
        Next.js. The most difficult part was to make the change to typescript.
      </p>
      <TabsDemo />
    </div>
  );
}

export default Section3;
