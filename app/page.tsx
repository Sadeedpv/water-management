"use client";
import Signin from "./components/Signin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { baseUrl } from "@/lib/constants";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.push(`/dashboard/home`);
  }, [session,router]);
  if (!session) {
    return (
      <Signin />
    )
  }
}
