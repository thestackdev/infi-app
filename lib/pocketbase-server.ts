import { cookies } from "next/headers";
import Pocketbase from "pocketbase";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function pocketbaseServer() {
  const pocketbase = new Pocketbase(BASE_URL);
  const authCookie = cookies().get("pb_auth");

  if (!authCookie) return null;

  pocketbase.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);

  return pocketbase;
}
