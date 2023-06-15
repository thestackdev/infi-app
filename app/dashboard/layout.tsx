import Navbar from "@/components/Navbar";
import pocketbaseServer from "@/lib/pocketbase-server";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pocketbase = pocketbaseServer();

  const user = pocketbase?.authStore.model;

  if (!user) redirect("/");

  return (
    <main>
      <Navbar className="mx-6" />
      {children}
    </main>
  );
}
