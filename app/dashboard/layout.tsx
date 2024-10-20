"use client";
import { baseUrl } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import SidePanel from "../components/SidePanel";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [loading, setloading] = useState(true);

  console.log(session);
  useEffect(() => {
    const PostUser = async () => {
      const req = await fetch(`${baseUrl}/api/Postdata`, {
        method: "POST",
        body: JSON.stringify({
          name: session?.user?.name,
          email: session?.user?.email,
        }),
      });
      console.log(req.status);
    };
    PostUser().then(() => {
      setloading(false);
    });
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <ClimbingBoxLoader color="#2563eb" size={25} />
    </div>
  ) : (
    <section>
      <div className="flex">
        {/* <div className="flex-auto w-14">SIDEPANEL</div> */}
        <SidePanel />
        {children}
      </div>
    </section>
  );
}
