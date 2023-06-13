"use client";

import { useRouter } from "next/navigation";
import Pocketbase, { Admin, Record } from "pocketbase";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const BASE_URL = "https://pocketbase.codefusionz.com";

type PocketbaseContextType = {
  pocketbase: Pocketbase;
  logout: () => void;
  user: Record | Admin | null;
};

const PocketbaseContext = createContext<PocketbaseContextType | undefined>(
  undefined
);

export default function PocketbaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pocketbase = useMemo(() => new Pocketbase(BASE_URL), []);
  const [user, setUser] = useState(pocketbase.authStore.model);

  useEffect(() => {
    pocketbase.authStore.loadFromCookie(document.cookie);

    const unsubscribe = pocketbase.authStore.onChange((token, model) => {
      document.cookie = pocketbase.authStore.exportToCookie({
        httpOnly: false,
      });
      setUser(model);
      router.refresh();
    });
    return () => unsubscribe();
  }, []);

  const logout = () => pocketbase.authStore.clear();

  return (
    <PocketbaseContext.Provider value={{ pocketbase, logout, user }}>
      {children}
    </PocketbaseContext.Provider>
  );
}

export const usePocketbase = () => {
  let context = useContext(PocketbaseContext);

  if (context === undefined) {
    throw new Error("usePocketbase must be used inside PocketbaseProvider");
  }

  return context;
};
