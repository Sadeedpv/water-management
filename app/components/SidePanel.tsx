"use client";
import {
  ChartNoAxesColumn,
  CircleChevronLeft,
  Droplets,
  House,
  Settings,
  Settings2,
  UserPen,
} from "lucide-react";
import { useContext, useState } from "react";
import { ActiveContext } from "../dashboard/layout";

export default () => {
  const [open, setOpen] = useState(true);
  const active = useContext(ActiveContext);
  console.log(active);
  const Menus = [
    { title: "Home", src: <House size={30} /> },
    { title: "Settings", src: <Settings size={30} /> },
    { title: "Preference ", src: <Settings2 size={30} /> },
    { title: "Reports", src: <ChartNoAxesColumn size={30} /> },
    { title: "Profile", src: <UserPen size={30} /> },
  ];

  return (
    <div
      className={` ${
        open ? "w-64" : "w-20 "
      }  h-screen p-5  pt-8 relative duration-300  shadow-2xl bg-gray-800`}
    >
      <CircleChevronLeft
        size={30}
        color="#2563eb"
        className={`absolute cursor-pointer -right-2 top-11 w-7 mr-5
             ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <Droplets
          size={50}
          color="#2563eb"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Smart Drop
        </h1>
      </div>
      <ul className="pt-6 ">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center m-5 gap-x-4 
                hover:text-[#2563eb]
               ${index === 0 && "bg-light-white"} ${
              active.active === Menu.title && "text-[#2563eb]"
              }`}
            onClick={() => {
              // change context to menu.title
              active.setActive(Menu.title)
            }}
          >
            {Menu.src}
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200 text-gray-200 text-lg font-extrabold hover:text-[#2563eb] ${
                active.active === Menu.title && "text-[#2563eb]"
              }`}
            >
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
