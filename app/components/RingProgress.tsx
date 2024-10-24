'use client';
import React, { useEffect, useState } from "react";

type RingProgressProps = {
  modelname: string;
  UsageLimit: number;
  totalUsage: number;
};

export default ({ modelname, UsageLimit, totalUsage }: RingProgressProps) => {
  const [percentage, setPercentage] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const calcpercentage = Math.min((totalUsage / UsageLimit) * 100, 100);
    setPercentage(calcpercentage);

  }, [])

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
    </div>
  );
};
