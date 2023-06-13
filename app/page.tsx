"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { usePocketbase } from "@/providers/pocketbase-provider";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const { pocketbase, user } = usePocketbase();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pocketbase.admins.authWithPassword(email, password);
    } catch (error: any) {
      toast({ title: "Login Failed", description: error?.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) router.push("/dashboard");
    else setPageReady(true);
  }, [user]);

  if (!pageReady)
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={64} />
      </div>
    );

  return (
    <main className="max-w-screen-sm mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold">Login</h1>
      <Card className="mt-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              className="mt-2"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              className="mt-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={loading} className="mt-4 w-full">
            {loading && <Loader className="mr-2 animate-spin" size={16} />}
            Login
          </Button>
        </form>
      </Card>
    </main>
  );
}
