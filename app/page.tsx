'use client'
import { useEffect } from "react";
import { baseUrl } from "@/lib/constants";
import Signin from "./components/Signin";
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();
  return session?
  (
      <div className="">
        DASHBOARD
      </div>
  ): (
      <Signin />
  );
}

