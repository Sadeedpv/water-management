"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import RingProgress from "./RingProgress";

interface RingProgressProps {
  Modelname: string;
  UsageLimit: number;
  totalUsage: number;
}

export default () => {
  const { data: session } = useSession();
  const [desc, setDesc] = useState(""); // Initialize with an empty string
    const [waterUsage, setWaterUsage] = useState(""); // Initialize with 0
    const [models, setModel] = useState([]);
  useEffect(() => {
    // Fetch water usage from /api/watermodel
    const getWaterUsage = async () => {
      const res = await fetch(
        `/api/watermodel?email=${
          session?.user?.email
        }&date=${new Date().toISOString()}`
      );
      try {
        const data = await res?.json();
        console.log(res);
        const model = data.model;
        if (model.length === 0) {
          toast.error("You are yet to provide your water usage data!");
        } else {
            setModel(model);            
        }
      } catch (err) {
        console.log(err);
      }
    };
    getWaterUsage();
  }, []);
 

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
              
              {models.length > 0 && (models.map((model: RingProgressProps, ind) => {
                  return <RingProgress key={ind} modelname={model?.Modelname} UsageLimit={model?.UsageLimit} totalUsage={model?.totalUsage} />;
              }))}

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
