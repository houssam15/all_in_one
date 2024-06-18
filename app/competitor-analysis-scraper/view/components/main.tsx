"use client"
import React from "react";
import { useEffect, useState } from "react";

interface MainPropTypes{
  children : any
}
export default function Main({children}:MainPropTypes) {  
    return (
      <div className="overflow-auto" style={{height:"calc(100vh - 3rem)"}}>
        {children}
     </div>
    );
  }
  