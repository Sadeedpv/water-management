"use client";
import { signIn } from "next-auth/react";

export default () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-transparent bg-img">
      <p className="mb-4 font-bold text-7xl">
        <span className="primary-txt">Smart</span> Drop
      </p>
      <div className="w-max">
        <p className="text-gray-700 text-center text-lg mb-10 animate-typing overflow-hidden whitespace-nowrap pr-5">
          A smart solution for tracking and reducing water waste{'   '}
        </p>
      </div>
      <button className="group relative h-12 w-36 overflow-hidden rounded-xl primary-clr text-lg font-bold text-white"
        onClick={() => {
          signIn();
      }}
      >
        Sign-in
        <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
      </button>
    </div>
  );
};
