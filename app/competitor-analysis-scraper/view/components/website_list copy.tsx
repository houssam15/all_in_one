"use client"
import React,{ useState, useMemo, useEffect ,useCallback}  from "react";
import { Spinner } from "flowbite-react";
import "@fortawesome/fontawesome-free/css/all.css";
import {ConfirmationModal , Table} from ".";
import {TableColumn , Position} from "../types";

export default function WebsiteList() {

  const [columns , setColumns] = useState<Column[]>([
    {key:"createdAt", title:"Date" , classes:""},
    {key:"speed", title:"Speed" , classes:""},
    {key:"totalPages", title:"Total pages" , classes:""},
    {key:"url", title:"Url" , classes:""},
    {key:"state", title:"State" , classes:""}
  ]);
  const [data , setData] = useState<any[]>([]);



  const [sitesList  ,setSitesList ] = useState<any[]>([]);
  const [rowsLimit , setRowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState<any[]>([]);
  const [customPagination, setCustomPagination] = useState<any[]>([]);
  const [totalPage , setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error , setError] = useState<string[]|null>(null);
  const [isRefresh , setIsRefresh] = useState(false);
  const [modalVisibleRows, setModalVisibleRows] = useState<{ [key: string]: boolean }>({});

  const showMessage = (data:any,delay:number)=>{
     setError(data?.errors);
    setTimeout( () => setError(null), delay );
  }

  const fetchWebsites = async () =>{
    const results = await fetch("/competitor-analysis-scraper/api/site/get-all");
    const content = await results.json();
    if(results.status!==200) return showMessage(data,3000);
    setData(content?.sites??[]);
    // setSitesList(data[0]);
    // setRowsToShow(data[0].slice(0, rowsLimit));
    // setTotalPage(Math.ceil(data[0]?.length / rowsLimit));
  }

  useEffect(()=>{
    fetchWebsites();
  },[]);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = sitesList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value:any) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = sitesList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = sitesList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(sitesList?.length / rowsLimit)).fill(null)
    );
  }, []);

  const refreshList =async () => {
    setIsRefresh(true);
    await fetchWebsites();
    setIsRefresh(false);
  }

  const handleDelete = (id:string) => {
    //setIsModalVisible(!isModalVisible);    
    setModalVisibleRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleModalConfirm = useCallback(async (isConfirmed:boolean , data:any) => {
    if (isConfirmed) {
      const result = await fetch("/competitor-analysis-scraper/api/site/delete?id="+data?.id);
      if(result.status!==200) return showMessage(await result.json(),3000);
      await refreshList();
    }
  }, []);

    return (
      <>
        <div className="w-full  flex min-h-80 items-center justify-center my-4">
            <div className="w-full max-w-4xl px-2">
        <div className="flex items-center justify-between">
          <div className="w-20"></div>
          <h1 className="text-4xl w-fit mx-auto mb-5">
          My websites
          </h1>
          <div className="w-20">
              <div onClick={refreshList} className="bg-gray-100 py-1 text-center rounded-sm border border-gray-400 cursor-pointer hover:bg-gray-200">
                {isRefresh?<Spinner aria-label="loading" className="mx-auto" />:"refresh"}
              </div>
          </div>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                
                <th className="py-3 px-3 text-[#212B36] sm:text-center font-bold whitespace-nowrap">
                  Date
                </th>
                <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-center font-bold whitespace-nowrap">
                  Speed
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-center font-bold whitespace-nowrap">
                  Total pages
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-center font-bold whitespace-nowrap">
                  Url
                </th>
                <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-center font-bold whitespace-nowrap gap-1">
                  State
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-center font-bold whitespace-nowrap">
                  Action
                </th>
              
              </tr>
            </thead>
            <tbody className="relative">
            <p className="absolute top-1 w-full ">
             {error?.slice(0,2).map((elm,index)=>( 
                <div key={index} className="w-1/2 mx-auto bg-red-200  rounded-sm p-2 text-center ">
                  {elm}
                </div>  
             ))} 
            </p>
             
              {rowsToShow?.map((data, index) => (
                <>
                {modalVisibleRows[data?.id] && <ConfirmationModal data={data} onConfirm={handleModalConfirm} setModalVisibilite={() => setModalVisibleRows((prev:any) => ({ ...prev, [data?.id]: !prev[data?.id] }))}  content={(
                  <>
                  <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  delete "{data?.url}" ?
                </p>
                  </>
                )}/>}  
                <tr
                  className={`${
                    index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                  }`}
                  key={index}
                >
                  <td
                  key={index}
                    className={ `py-2 px-3 font-normal text-center ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap` }
                  >
                    {data?.createdAt.split("T")[0]}
                  </td>
                  <td
                    key={index}
                    className={`py-2 px-3 font-normal text-center ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.speed??"-----"}
                  </td>
                  <td
                    key={index}
                    className={`py-2 px-3 text-center  font-normal ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.totalPages??"------"}
                  </td>
                  <td
                    key={index}
                    className={`py-2 px-3 text-center  font-normal ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } min-w-[250px]`}
                  >
                    {data?.url}
                  </td>
                  <td
                    key={index}
                    className={`py-5 px-4 text-center  font-normal ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}
                  >
                    {data?.state}
                  </td>
                   <td
                    key={index}
                    className={`py-2 px-3 font-normal text-center  ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {/* {data?.id} */}
                    <div>
                      <i onClick={()=>handleDelete(data?.id)} className="fa-regular fa-trash-can cursor-pointer hover:text-red-500"></i> 
                    </div>
                  </td>
                </tr>
                </>  
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          <div className="text-sm text-gray-400">
            Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage == totalPage - 1
              ? sitesList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {sitesList?.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                  currentPage == 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }
  `           }
                onClick={previousPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
              </li>
              {customPagination?.map((data:any, index:number) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage == index
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB] "
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage == totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={nextPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
        </div>

    </>
    );
  }
  

