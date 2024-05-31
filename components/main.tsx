"use client"
import { useEffect, useState } from "react";

interface MainPropTypes{
  children : any
}
export default function Main({children}:MainPropTypes) {
    
    return (
     <div>
        {children}
     </div>
    );
  }
  