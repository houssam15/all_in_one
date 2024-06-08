"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import { MenuType } from "../config/type";

//   Dépannage
export default function SideNavList() {
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/modules/api/menu");
        setMenu(response.data.data.menu);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }//x
    };
    fetchMenu();
  }, []);

  return isLoading ? (
    // Add loading indicator here
    <div className="text-white">Loading...</div>
  ) : !isError ? (
    menu.filter(elm => elm.active == true ).map((elm) => (
      <Link
        key={elm.route}
        className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        href={elm.route}
      >
        <i className={`${elm.icon} text-lg`} />
        <span className="mx-2 font-bold text-xs">{elm.name}</span>
      </Link>
    ))
  ) : (
    <div className="text-white">Error</div>
  );
}
