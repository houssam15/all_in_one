"use client"
import { useEffect, useState } from "react";

interface MainPropTypes{
  children : any
}
export default function Main({children}:MainPropTypes) {
    
    return (
      <div className="h-screen overflow-auto" style={{ width: "calc(100% - 150px)" }}>
        {children}
     </div>
    );
  }
  