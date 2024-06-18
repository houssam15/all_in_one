"use client"
import React, { useEffect, useState } from "react";
import { TypeWriter } from ".";

export default function Header() {  
    const [isExpand,  setIsExpand] = useState(false);
    const [animate ,setAnimate] = useState(false);
    useEffect(()=>{
        setTimeout(()=>setIsExpand(true),1000)
    },[])
    /*function handleClick(){
        if(isExpand) return;
        setAnimate(true);
        setTimeout(()=>{ setIsExpand(!isExpand); setAnimate(false);},1000);
        //setTimeout( ()=>{ setIsExpand(false) } , 10000);
    }*/
    return (
        <div className="w-full h-32 flex items-center box-border ">
            <div className={`w-full mx-2`}>
            <h1 className={`w-fit text-center cursor-pointer mx-auto ${!isExpand?"mt-3":""} transition duration-1000 ease-in relative` }>
                <span className={`text-4xl ${!isExpand?"px-2":""} text-black  ${animate?"mr-[20px]":""} ${animate ? "animate-fade-in" : ""}`}>C</span>{isExpand?"ompetitor ":""}
                <span className={`text-4xl ${!isExpand?"px-2":""} text-black  ${animate && !isExpand?"text-black text-4xl animate-fade-in":""}`}>A</span>{isExpand?"nalysis ":""} 
                <span className={`text-4xl ${!isExpand?"px-2":""} text-black  ${animate?"ml-[20px]":""} ${animate ? "animate-fade-in" : ""}`}>S</span>{isExpand?"craper ":""}
            </h1>
            {isExpand?(
               <p className={`flex text-gray-500  items-end w-fit mx-auto mt-5`}>
                 <TypeWriter delay={80} text="  web scraping tool designed to help businesses gather valuable insights about their competitors." state={isExpand} />
               </p>
            ):(
               <></>
            )}
           
            </div>     
        </div>
    );
  }
  