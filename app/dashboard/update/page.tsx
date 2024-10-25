"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default () => {
  // Single state for water usage input
  const { data: session } = useSession();
  const [model, setModel] = useState([]);
  const [waterUsageArr, setWaterUsageArr] = useState([""]);

  async function handleSubmit(Modelname: string, modelid:string, ind:number) {
    // Fetching function or data handling logic here
    toast.loading("Your data us being updated");
    const res = await fetch("/api/watermodel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: modelid,
        email: session?.user?.email,
        modelname: Modelname,
        usage: Number(waterUsageArr[ind]),
        date: new Date().toISOString(),
      }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Water usage data updated successfully!");
    }
  }

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
          console.log("model", model);
          setModel(model);
          model.map((m: any, ind: any) => {
            setWaterUsageArr([...waterUsageArr, ""]);
          });
          console.log("waterUsage", waterUsageArr);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getWaterUsage();
  }, []);

  return (
    <div className="h-screen flex-1 p-24 ms-12 md:ms-52">
      <h1 className="text-2xl font-semibold mb-4">Update Todays Water Usage</h1>

      {model.length > 0 &&
        model.map((model: any, ind) => {
          console.log(ind)
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(model?.Modelname, model?.id, ind);
              }}
              className="space-y-4 flex flex-row gap-6 mb-6"
              key={ind}
            >
              <input
                type="text"
                name="waterModel"
                value={model?.Modelname}
                className="border p-2 rounded-md w-1/3"
              />
              <input
                type="number"
                name="waterUsage"
                value={waterUsageArr[ind]}
                onChange={(e) => {
                  const updatedArr = [...waterUsageArr]; // Make a copy of the array
                  updatedArr[ind] = e.target.value; // Update the specific index
                  setWaterUsageArr(updatedArr);
                }}
                placeholder={model?.totalUsage.toString()}
                className="border p-2 rounded-md w-1/3"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold mt-4"
              >
                Submit
              </button>
            </form>
          );
        })}
      <Toaster
        toastOptions={{
          duration: 2000,
          position: "bottom-center",
        }}
      />
    </div>
  );
};
