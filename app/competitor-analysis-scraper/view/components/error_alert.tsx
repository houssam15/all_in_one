"use client"
import React, { useEffect } from "react";
//hideDuration={3000} hideAction
export default function ErrorAlert ({errors,hideDuration,hideAction}:{errors:string[] , hideDuration:number , hideAction:any}) {

    useEffect(()=>{
        const timeoutId = setTimeout( () => hideAction(), hideDuration );
        return ()=> clearTimeout(timeoutId);
    },[errors])

    return(
        <div className="absolute top-1 w-full">
        {errors.map((elm, index) => (
          <div key={index} className="w-1/2 mx-auto bg-red-200 rounded-sm p-2 text-center">
            {elm}
          </div>
        ))}
      </div>
    );
}