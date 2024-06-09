'use client' 
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { CreateWebsite } from './../../../controller/CreateSite';


const page = () => {

    const [site,setSite] = useState("")
    const [description,setDescription] = useState("")
    const handleSubmit = (e)=> {

        e.preventDefault();
        CreateWebsite(site, description)
        .then((res) => {
          if (res) {
            alert("Website created successfully!");
          } else {
            alert("An error occurred while creating the website. Please try again later.");
          }
        })
        .catch((err) => {
          console.error("Error creating website:", err);
          alert("An error occurred while creating the website. Please try again later.");
        });
         
    }


  return (
 <>
 
    <NavBar/>
<div className="mx-auto bg-gray-800 h-full max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Add Site</h1>

   
  </div>

  <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div>
      <label htmlFor="email" className="sr-only">Email</label>

      <div className="relative">
        <input
          type="text"
          onChange={(e)=>setSite(e.target.value)}
          className="w-full rounded-lg text-gray-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter Url"
        />

  
      </div>
    </div>

    <div>
      <label htmlFor="password" className="sr-only">Description</label>

      <div className="relative">
        <textarea
          type="text"
          onChange={(e)=>setDescription(e.target.value)}
          className="w-full rounded-lg text-gray-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter Description"
        />

    
 
      </div>
    </div>

    <div className="flex items-center justify-between">
    
      
     

      <button
        type="submit" onClick={(e)=>handleSubmit(e)}
        className="inline-block    rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
      >
        Add
      </button>
    </div>
  </form>
</div>
</>
  )
}

export default page