"use client"
import { useState , useEffect } from "react";
import { ListGroup } from "flowbite-react";
import { HiChevronDown, HiChevronUp, HiUserCircle } from "react-icons/hi";
import Link from "next/link";
import Route from "../config/route";
import { RouteType } from "../config/type";

export default function SideNavList() {
    const [openRoutes, setOpenRoutes] = useState<{ [key: string]: boolean }>({});
    const routes = new Route();

    useEffect(() => {
      setOpenRoutes({});
    }, []);

    const toggleChildren = (route: string) => {
        setOpenRoutes(prevState => ({
            ...prevState,
            [route]: !prevState[route]
        }));
    };

    const renderRoutes = (routes: Array<RouteType>) => {
        return routes.map((elm) => (
            <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href={elm.route}
          >
            {/* <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            {elm.icon && <elm.icon className="" size={25}  />}
            <span className="mx-2 font-bold text-sm"> {elm.name}</span>
          </Link>
        ));
    };

    return (
       
                 renderRoutes(routes.getRoutes())
            
     
    );
}
