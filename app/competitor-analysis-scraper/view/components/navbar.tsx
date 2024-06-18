import React from "react";
import Image from "next/image";
import {logo} from "../assets";
export default function Navbar() {
    return ( 
 <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 h-[3rem]" >
  <div className=" flex items-center justify-between mx-auto h-full">
    <a href="#" className="flex items-center ml-5">
        <img src={logo}  alt="logo" className="h-14"/>
    </a>
  </div>
 </nav>
    );
    
  }