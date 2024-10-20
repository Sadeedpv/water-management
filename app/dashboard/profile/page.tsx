"use client";

import { baseUrl } from "@/lib/constants";
import { LogOut, MapPin } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("India");
    const [input, setInput] = useState("");
    const router = useRouter();

  // handleClick
  const handleClick = async (e: any) => {
    // update location
    const data = {
      email: session?.user?.email,
      location: input,
    };
    const req = await fetch(`${baseUrl}/api/location`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    setLocation(res.update.location);
    toast.success("Location updated successfully!");

    setInput("");
    setOpen(false);
  };

  useEffect(() => {
    const getLocation = async () => {
      const req = await fetch(
        `${baseUrl}/api/location?email=${session?.user?.email}`
      );
      const res = await req.json();
      const data = res.location;
      setLocation(data.location);
    };
    getLocation();
  });
  return (
    <div className="h-screen flex-1 p-7 items-center justify-center flex">
      <div className="py-8 px-12 mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <Image
          src={
            session?.user?.image ||
            "https://cdn-icons-png.flaticon.com/512/5436/5436149.png"
          }
          alt="Profile image"
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          width={90}
          height={90}
        />
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold text-wrap">
              {session?.user?.email}
            </p>
            <p className="text-slate-500 font-medium">{session?.user?.name}</p>
          </div>
          <div className="flex flex-row gap-4">
            <button
              className="group relative h-10 w-28 overflow-hidden rounded-xl primary-clr text-sm font-bold text-white flex flex-row items-center justify-center gap-2"
              onClick={() => {
                  signOut().then(() => { 
                      router.push(baseUrl);
                  });
              }}
            >
              Sign-out <LogOut size={18} />
              <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
            <button
              className="group relative h-10 w-28 overflow-hidden rounded-xl primary-clr text-sm font-bold text-white flex flex-row items-center justify-center
               gap-2"
              onClick={() => {
                setOpen(!open);
              }}
            >
              Location
              <MapPin size={18} />
              <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
          </div>
          <div className={`flex-col gap-2 ${open ? "flex" : "hidden"}`}>
            <div className="w-full max-w-sm min-w-[200px] mt-12">
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={location}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            <button
              className="group relative h-10 w-28 overflow-hidden rounded-xl primary-clr text-sm font-bold text-white flex flex-row items-center justify-center
               gap-2"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Update
              <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
};
