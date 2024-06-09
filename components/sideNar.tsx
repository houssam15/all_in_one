
import { Suspense } from "react";
import SideNavList from "./sideNavList";
import {   CiCircleQuestion } from "react-icons/ci";

// interface SideNavPropsType{
//   setMainContent:any
// }
export default function SideNar(/*{setMainContent}:SideNavPropsType*/) {
    return (
      <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-gray-900   rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700"  style={{ scrollbarWidth: "thin" }}>
      <a href="#">
      <img
  className="w-auto h-6 sm:h-7"
  src="/image.png"
  alt=""
  style={{ minHeight: 40, width: 60 }}
/>

      </a>
 
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
        <Suspense fallback={<p>Loading feed...</p>}>
          <SideNavList />
          </Suspense>
          {/* <a
            className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
             <CiCircleQuestion size={25} />
            <span className="mx-4 font-medium">Not yet</span>
          </a>
          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <CiCircleQuestion size={25} />
          
            <span className="mx-4 font-medium">Not yet</span>
          </a>
          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
         <CiCircleQuestion size={25} />
            <span className="mx-4 font-medium">Not yet</span>
          </a>
          <hr className="my-6 border-gray-200 dark:border-gray-600" />
          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
              <CiCircleQuestion size={25} />
            <span className="mx-4 font-medium">Not yet</span>
          </a> */}
          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <CiCircleQuestion size={25} />
            <span className="mx-4 font-medium">Settings</span>
          </a>
        </nav>
        <a href="#" className="flex items-center px-4 -mx-2">
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
            Superadmin
          </span>
        </a>
      </div>
    </aside>
    
      
    );
} 