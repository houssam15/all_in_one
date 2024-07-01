"use client"
import React, { useEffect } from "react";
import {AlertType} from "../types"
//hideDuration={3000} hideAction
export default function MyAlert ({alertData,hideDuration,hideAction }:{alertData:{messages:string[] , type:AlertType} , hideDuration:number , hideAction:any }) {

    useEffect(()=>{
        const timeoutId = setTimeout( () => hideAction(), hideDuration );
        return ()=> clearTimeout(timeoutId);
    },[alertData])

    return(
        <div className="w-full">
        {alertData.messages.map((elm, index) => (
          <div key={index} className={`w-1/2 mx-auto  rounded-sm p-2 text-center ${
            alertData.type==AlertType.ERROR?"bg-red-200":(alertData.type==AlertType.WARNING?"bg-yellow-200":"bg-blue-200")
          }`}>
            {elm}
          </div>
        ))}
      </div>
    );
}