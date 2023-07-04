"use client";

import { useThemeStore } from "@/store";
import { ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();

  // wait till nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <body className="bg-base-100 font-roboto" data-theme={themeStore.mode}>
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
}
