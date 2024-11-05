"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import RingProgress from "./RingProgress";
import useSWR from "swr";

interface RingProgressProps {
  Modelname: string;
  UsageLimit: number;
  totalUsage: number;
}

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const model = await response.json();
    console.log("Model from fetcher", model.model);
    return model.model || []; // Ensure it returns an array or a consistent value
  } catch (error) {
    console.error("Fetcher error:", error);
    return []; // Return an empty array on error to avoid undefined issues
  }
};

export const Waterdata = () => {
  const { data: session } = useSession();
  const [date] = useState(new Date().toISOString());
  const url = `/api/watermodel?email=${session?.user?.email}&date=${date}`;
  const { data: models, error } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  console.log(models);
  console.log("Potential error: " + error);
  if (models?.length === 0) {
    toast.error("You are yet to provide your water usage data!");
  }
  const [desc, setDesc] = useState(""); // Initialize with an empty string
  const [waterUsage, setWaterUsage] = useState(""); // Initialize with 0

  const handleSubmit = async (e: any) => {
    // POST /api/watermodel
    e.preventDefault();
    toast.loading("Your data is being updated");
    const res = await fetch("/api/watermodel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
        modelname: desc,
        limit: Number(waterUsage),
        date: new Date().toISOString(),
      }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Water usage data submitted successfully!");
    }
  };
  return (
    <>
      <div className="h-screen flex-1 p-16 w-full mb-14 mt-4">
        <h1 className="text-2xl font-semibold mb-4">Your Water Consumption</h1>
        <div className="flex flex-row gap-6">
          {models?.length > 0 &&
            models.map((model: RingProgressProps, ind:any) => {
              return (
                <RingProgress
                  key={ind}
                  modelname={model?.Modelname}
                  UsageLimit={model?.UsageLimit}
                  totalUsage={model?.totalUsage}
                />
              );
            })}
        </div>

        <h1 className="text-2xl font-semibold mb-4 mt-14">Set Water Usage</h1>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input
            type="text"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter how you will you use water(Eg: For bathing)"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="number"
            name="waterUsage"
            min={0}
            value={waterUsage}
            onChange={(e) => setWaterUsage(e.target.value)}
            placeholder="Enter water usage in liters"
            className="border p-2 rounded-md w-full"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold mt-4"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster
        toastOptions={{
          duration: 2000,
          position: "bottom-center",
        }}
      />
    </>
  );
};
