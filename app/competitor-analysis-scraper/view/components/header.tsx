"use client"
import React, { useState } from "react";
import { TypeWriter } from ".";

export default function Header() {  
    const [isExpand,  setIsExpand] = useState(false);
    const [animate ,setAnimate] = useState(false);

    function handleClick(){
        setAnimate(true);
        setTimeout(()=>{
            setIsExpand(!isExpand);
            setAnimate(false);
        },1000);
        
    }
    return (
        <div className="w-full h-14 flex items-center box-border">
            <div className={`w-full mx-2 h-full`}>
            <h1 onClick={()=>handleClick()} className={`w-fit text-center cursor-pointer mx-auto ${!isExpand?"mt-3":""} transition duration-1000 ease-in relative` }>
                <span className={`text-2xl text-red-400  ${animate?"mr-[20px]":""}`}>C</span>{isExpand?"ompetitor":""}  <span className={`text-2xl text-red-400 ${animate && !isExpand?"absolute -top-5":""}`}>A</span>{isExpand?"nalysis":""} <span className={`text-2xl text-red-400 ${animate?"ml-[20px]":""}`}>S</span>{isExpand?"craper":""}
            </h1>
            <p className={`${isExpand?"flex":"hidden"} text-gray-500  items-end w-fit mx-auto`}>
              <TypeWriter delay={50} text="is a powerful web scraping tool designed to help businesses gather valuable insights about their competitors." setState={setIsExpand} state={isExpand}/>
            </p>
            </div>     
        </div>
    );
  }
  