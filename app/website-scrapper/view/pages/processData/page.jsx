'use client' 
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { CreateWebsite } from './../../../controller/create_site';
import axios from 'axios';

const page = () => {
  const [process, setProcess] = useState("start");
  const [images, setImages] = useState("start");
  const [pages, setPages] = useState("start");
  const [ressources, setRessources] = useState("start");
  const [showNext, setShowNext] = useState(false);

  const StartProcess = (e) => {
    e.preventDefault();
    setProcess("working");
    setPages("working");
  }

  const fetchData = async (url, setState ,setNext=null) => {
    try {
       const response = await axios.get(url);

       setState(response.data.progress);
      if(setNext){
        setNext("working");
    }else{
      setShowNext(true)
      setProcess("Done")
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const retrievePages = () => fetchData('http://localhost:3000/website-scrapper/api/process_pages?site=https://espacecouture.fr/', setPages,setImages);
  const retrieveRessources = () => fetchData('http://localhost:3000/website-scrapper/api/process_ressources?site=https://espacecouture.fr/', setRessources);
  const retrieveImages = () => fetchData('http://localhost:3000/website-scrapper/api/process_images?site=https://espacecouture.fr/', setImages,setRessources);

  useEffect(() => {
    if (process) {
      if (images === "working") {
        retrieveImages();
      }
      if (pages === "working") {
        retrievePages();
      }
      if (ressources === "working") {
        retrieveRessources();
      }
    }
  }, [process, images, pages, ressources]);

  return (
    <>
      <NavBar />
      <div className="mx-auto bg-gray-800 h-full max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Process Data</h1>
          <button class="bg-green-700 p text-green-100 py-2 my-4 px-4 rounded-full text-xs font-bold" onClick={(e) => StartProcess(e)}>{process}</button>
          <div className='container bg-gray-900 h-full max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        
        <div className='Pages flex flex-wrap items-center justify-between mb-4 p-4 bg-gray-800 rounded-lg shadow-md'>
          <span className='text-white text-lg font-semibold'>Pages</span>
          <button className=' text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300'>  
            {pages === "working" ? (
              <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : pages === "DONE" ? (
              <div class="bg-green-700 text-green-100 py-2 px-4 rounded-full text-xs font-bold">Success</div>
            ) : pages === "start" ? (
              <div class="bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-xs font-bold">1/3</div>
            ) : (
              <div class="bg-red-600 text-red-100 py-2 px-4 rounded-full text-xs font-bold">Error</div>
            )}
          </button>
 
        </div>
        <div className='Pages flex flex-wrap items-center justify-between mb-4 p-4 bg-gray-800 rounded-lg shadow-md'>
          <span className='text-white text-lg font-semibold'>Images</span>
          <button className=' text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300'>
          {images === "working" ? (
              <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : images === "DONE" ? (
              <div class="bg-green-700 text-green-100 py-2 px-4 rounded-full text-xs font-bold">Success</div>
            ) : images === "start" ? (
              <div class="bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-xs font-bold">2/3</div>
            ) : (
              <div class="bg-red-600 text-red-100 py-2 px-4 rounded-full text-xs font-bold">Error</div>
            )}
          </button>
        </div>
        <div className='Pages flex flex-wrap items-center justify-between mb-4 p-4 bg-gray-800 rounded-lg shadow-md'>
          <span className='text-white text-lg font-semibold'>Resources</span>
          <button className='  text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300'> 
           {ressources === "working" ? (
              <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : ressources === "DONE" ? (
              <div class="bg-green-700 text-green-100 py-2 px-4 rounded-full text-xs font-bold">Success</div>
            ) : ressources === "start" ? (
              <div class="bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-xs font-bold">3/3</div>
            ) : (
              <div class="bg-red-600 text-red-100 py-2 px-4 rounded-full text-xs font-bold">Error</div>
            )}
            </button>
        </div>
         { showNext && <button className='bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300'>See Results</button>
        }
      </div>

        </div>
      </div>
    </>
  )
}

export default page
