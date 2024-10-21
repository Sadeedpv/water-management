"use client";
import { useState } from "react";

export default () => {
  // Single state for water usage input
  const [waterUsage, setWaterUsage] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Fetching function or data handling logic here
    console.log("Water usage:", waterUsage);
  };

  return (
    <div className="h-screen flex-1 p-24 ms-12 md:ms-52">
      <h1 className="text-2xl font-semibold mb-4">Update Water Usage</h1>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <input
          type="number"
          name="waterUsage"
          value={waterUsage}
          onChange={(e) => setWaterUsage(e.target.value)}
          placeholder="Enter water usage in liters"
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
    </div>
  );
};
