'use client'
import Signin from "./components/Signin";
import { useSession } from "next-auth/react";
import Dashboard from "./components/Dashboard";


export default function Home() {
  const { data: session } = useSession();
  return session?
  (
      <Dashboard />
  ): (
      <Signin />
  );
}

