"use client"
import React,{ useState, useMemo, useEffect }  from "react";
import { Spinner } from "flowbite-react";

export default function WebsiteList() {

  const [sitesList  ,setSitesList ] = useState<any[]>([]);
  const [rowsLimit , setRowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState<any[]>([]);
  const [customPagination, setCustomPagination] = useState<any[]>([]);
  const [totalPage , setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isError , setIsError] = useState(false);
  const [isRefresh , setIsRefresh] = useState(false);
  const fetchWebsites = async () =>{
    const results = await fetch("/competitor-analysis-scraper/api/site/get-all");
    if(results.status!==200) return setIsError(true);
    const {data} = await results.json();
    setSitesList(data[0]);
    setRowsToShow(data[0].slice(0, rowsLimit));
    setTotalPage(Math.ceil(data[0]?.length / rowsLimit));
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
    return (
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
                  ID
                </th>
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
              </tr>
            </thead>
            <tbody>
              {rowsToShow?.map((data, index) => (
                <tr
                  className={`${
                    index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                  }`}
                  key={index}
                >
                  <td
                    className={`py-2 px-3 font-normal text-center  ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.id}
                  </td>
                  <td
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
                </tr>
                
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
  `}
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
    );
  }
  

