"use client";

import {Waterdata} from "@/app/components/Waterdata";
import { baseUrl } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default () => {
  const { data: session } = useSession();
  const [location, setLocation] = useState([]);
  const [hardness, setHardness] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [bacteria, setBacteria] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const getRandomNo = () => {
    let no = Math.floor(Math.random() * (80 - 40 + 1) + 40);
    return no;
  };
  useEffect(() => {
    const getLocation = async () => {
      const req = await fetch(
        `${baseUrl}/api/location?email=${session?.user?.email}`
      );
      const res = await req.json();
      const data = await res.location;
      const location = await data.location;
      setLocation(location);
    };

    getLocation();
    setHardness(getRandomNo());
    setClarity(getRandomNo());
    setBacteria(getRandomNo());
    setTemperature(getRandomNo());
  }, []);

  return (
    <div className="h-screen flex-1 p-20 ms-12 md:ms-52 flex flex-col">
      <div className="p-16">
        <h1 className="text-2xl font-semibold mb-6">
          Live water Report at {location}
        </h1>

        {/* <!-- Chart --> */}
        <div className="space-y-4">
          {/* <!-- Hardness --> */}
          <div>
            <p className="font-bold">Hardness - {hardness}%</p>
            <div className="w-1/2 bg-gray-200 rounded-full h-6">
              <div
                className={`bg-blue-600 h-6 rounded-full`}
                style={{ width: `${hardness}%` }}
              ></div>
            </div>
          </div>

          {/* <!-- Acidity --> */}
          <div>
            <p className="font-bold">Clarity - {clarity}%</p>
            <div className="w-1/2 bg-gray-200 rounded-full h-6">
              <div
                className={`bg-green-600 h-6 rounded-full`}
                style={{ width: `${clarity}%` }}
              ></div>
            </div>
          </div>

          {/* <!-- Clarity --> */}
          <div>
            <p className="font-bold">Bacteria Content {bacteria}%</p>
            <div className="w-1/2 bg-gray-200 rounded-full h-6">
              <div
                className={`bg-yellow-500 h-6 rounded-full`}
                style={{ width: `${bacteria}%` }}
              ></div>
            </div>
          </div>

          {/* <!-- Bacteria Content --> */}
          <div>
            <p className="font-bold">Temperature {temperature}%</p>
            <div className="w-1/2 bg-gray-200 rounded-full h-6">
              <div
                className={`bg-red-500 h-6 rounded-full`}
                style={{ width: `${temperature}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Waterdata />
    </div>
  );
};
