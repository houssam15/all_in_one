"use client"
import React, { useState } from "react";
import { Spinner } from "flowbite-react";


export default function AddWebsite() { 
    const [url , setUrl] = useState<string>("");
    const [error,setError] = useState<string[]|null>(null);
    const [result,setResult] = useState<string|null>(null);
    const [loading , setLoading] = useState(false);

    const showMessage = (data:any,delay:number , isError?:boolean)=>{
      if(isError) setError(data?.errors);
      else {
        setUrl("")
        setResult( data?.results.message);
      }
      setTimeout( () => isError?setError(null):setResult(null) , delay );
    }
    
    const fetchData =async (url:string)=>{
      if(loading) return;
      setLoading(true);
      const result = await fetch(url);
      setLoading(false);
      return result;
    }

    const submitForm = async ()=>{
      fetchData
      const result = await fetchData("/competitor-analysis-scraper/api/site/add-one?url="+url);
      showMessage(await result?.json() , 3000 , result?.status!==200);
    }

    return (
        <div className="w-full h-60 mt-20 border-box">
              <h1 className="text-4xl mx-auto w-fit mt-5">Add new website here</h1>

              <div className="border border-gray-200 w-fit mx-auto px-2 mt-5">
                <span>Example :</span>
                <span> https://hello.com</span>
              </div>
              
              <div className=" w-1/2 mx-auto mt-5">
                <form className=" flex items-center py-5 justify-around">
                    <div className="w-2/3 flex items-center ">
                        <label htmlFor="url">Url :</label>
                        <div className="w-3/4 mx-2 relative">
                        <input type="text" value={url} onChange={(e)=>setUrl(e.target.value)} name="url" className="w-full  outline-none border border-gray-300 py-2 px-2 rounded-sm "/>
                        <div className=" absolute top-[120%] w-full">
                          {error?.slice(0,2).map((elm,index)=>(
                            <div className="bg-red-300 mb-2 p-2">
                              {elm}
                            </div>
                          ))}
                           {result?(
                            <div className="bg-green-300 mb-2 p-2">
                              {result}
                            </div>
                          ):<></>}
                        </div>
                        </div>
                    </div>
                    <div onClick={submitForm} className="border border-gray-200 rounded-sm  w-1/4 text-center py-2 bg-gray-100 cursor-pointer">
                        {!loading?(
                          <>
                          Add
                          </>
                        ):(
                           <Spinner aria-label="loading" className="mx-auto" />
                        )} 
                    </div>
                </form>
              </div>
        </div>
    );
  }
  