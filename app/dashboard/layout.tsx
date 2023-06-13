import Navbar from "@/components/Navbar";
import pocketbaseServer from "@/lib/pocketbase-server";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pocketbase = pocketbaseServer();

  const user = pocketbase?.authStore.model;

  if (!user) redirect("/");

  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Navbar className="mx-6" />
        {children}
      </body>
    </html>
  );
}
