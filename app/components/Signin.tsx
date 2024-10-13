'use client'
import { signIn, signOut, useSession } from "next-auth/react";

export default () => {
    const { data: session } = useSession();

    return (
      <>
        <button
          onClick={() => {
            session ? signOut() : signIn();
          }}
        >
          {session? 'Sign-out':'Sign-in'}
        </button>
      </>
    );

}