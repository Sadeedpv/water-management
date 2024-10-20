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
import {  useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { baseUrl } from "@/lib/constants";

export default () => {
  const [open, setOpen] = useState(
    window.innerWidth > 640 ? true : false,
  );
  const router = useRouter();
  const pathName = usePathname();
  console.log("pathname :" ,pathName);
  const Menus = [
    { title: "Home", src: <House size={30} />, path: `/dashboard/home` },
    { title: "Preference ", src: <Settings2 size={30} />, path: `/dashboard/preference` },
    { title: "Reports", src: <ChartNoAxesColumn size={30} />, path: `/dashboard/reports` },
    { title: "Profile", src: <UserPen size={30} />, path: `/dashboard/profile` },
  ];


  return (
    <div
      className={` ${
        open ? "w-64" : "w-10 md:wd-20"
      }  h-screen p-5  pt-8 fixed z-10 duration-300  shadow-2xl bg-gray-800`}
    >
      <CircleChevronLeft
        size={30}
        color="#2563eb"
        className={`absolute cursor-pointer -right-2 top-11 w-7 mr-3 md:mr-5
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
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center m-5 gap-x-4 
                hover:text-[#2563eb]
                ${pathName == Menu.path ? "text-[#2563eb]" : "text-gray-300"}`}
            onClick={() => {
              // change localstorage to menu.title
              router.push(`${baseUrl}/dashboard/${Menu.title.toLowerCase()}`);
            }}
          >
            {Menu.src}
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200 text-lg font-extrabold hover:text-[#2563eb] ${
                pathName == Menu.path ? "text-[#2563eb]" : "text-gray-200"
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
