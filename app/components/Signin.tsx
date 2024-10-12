'use client'
import { signIn, useSession } from "next-auth/react";

export default () => {
    const { data: session } = useSession();

    return (
      <>
        <button
          onClick={() => {
            session ? alert("Signed-in") : signIn();
          }}
        >
          Sign in
        </button>
      </>
    );

}