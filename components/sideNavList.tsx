"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MenuType } from "../config/type";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";

//dépanage
export default function SideNavList() {
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/modules/api/menu");
        console.log(response);
        setMenu(response.data.data.menu);
      } catch (error) {
        console.log(error)
        setIsError(true);
      }
    };
    fetchMenu();
  }, []);

  return !isError ? (
    menu.map((elm) => (
      <Link
        key={elm.route}
        className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        href={elm.route}
      >
        <i className={`${elm.icon} text-lg`} />
        <span className="mx-2 font-bold text-sm">{elm.name}</span>
      </Link>
    ))
  ) : (
    <>error</>
  );
}