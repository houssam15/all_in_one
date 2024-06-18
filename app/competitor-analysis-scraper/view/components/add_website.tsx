import React from "react";


export default function AddWebsite() {  
    return (
        <div className="w-full h-60 border-box">
              <h1 className="text-4xl mx-auto w-fit mt-5">Add new website here</h1>

              <div className="border border-gray-200 w-fit mx-auto px-2 mt-5">
                <span>Example :</span>
                <span> https://hello.com</span>
              </div>
              
              <div className=" w-1/2 mx-auto mt-5">
                <form className=" flex items-center py-5 justify-around">
                    <div className="w-2/3 flex items-center">
                        <label htmlFor="url">Url :</label>
                        <input type="text" name="url" className="w-3/4 mx-2 outline-none border border-gray-300 py-2 px-2 rounded-sm "/>
                    </div>
                    <div className="border border-gray-200 rounded-sm  w-1/4 text-center py-2 bg-gray-100 cursor-pointer">
                        Add
                    </div>
                </form>
              </div>
        </div>
    );
  }
  