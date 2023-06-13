"use client";

import { usePocketbase } from "@/providers/pocketbase-provider";
import { Button } from "./ui/button";

export default function Logout() {
  const { logout } = usePocketbase();

  return (
    <Button className="w-full" onClick={logout}>
      Logout
    </Button>
  );
}
