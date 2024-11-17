"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type RingProgressProps = {
  modelname: string;
  UsageLimit: number;
  totalUsage: number;
};

export default ({ modelname, UsageLimit, totalUsage }: RingProgressProps) => {
  const { data: session } = useSession();
  const [percentage, setPercentage] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const calcpercentage = Math.min((totalUsage / UsageLimit) * 100, 100);
    setPercentage(calcpercentage);
    if (calcpercentage >= 100) {
      toast.error(`You have exceeded your water usage limit for${modelname}!`);

      // const sendEmail = async (email: any) => { 
        
      //   const res = await fetch('/api/sendmail', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       email: email,
      //     }),
      //   });
      //   const result = await res.json();
      //   console.log(result);

      // }
      // // Send email notification
      // sendEmail(session?.user?.email);
    }
  }, []);

  /* Ring progress bar */
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">{modelname}</h2>
      <div className="relative">
        <svg className="w-24 h-24 transform rotate-90">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className="text-blue-500"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
            style={{ transition: "stroke-dashoffset 0.5s" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 2000,
          position: "bottom-center",
        }}
      />
    </div>
  );
};
