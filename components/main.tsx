"use client"
import { useEffect, useState } from "react";

interface MainPropTypes{
  children : any
}
export default function Main({children}:MainPropTypes) {
    
    return (
     <div  className="col-span-9 h-[95vh]">
        {children}
     </div>
    );
  }
  