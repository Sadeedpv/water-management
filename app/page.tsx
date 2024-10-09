'use client'
import { useEffect } from "react";
import { baseUrl } from "@/lib/constants";
import { signIn, useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log("hi")
    const getPosts = async () => {
      try {
        const feed = await fetch(`${baseUrl}/api/getData`);
        const json = await feed.json();
        console.log(json)
        signIn()
        console.log("SIgning in: ", session);

      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, [])
  return (
    <div>
      HELLO WORLD!
    </div>
  );
}

