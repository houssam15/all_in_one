"use client"
import React ,{useState , useMemo} from "react";
import {TableColumn , TableAction , RowAction, Position} from "../types";
import { Spinner } from "flowbite-react";


export default function Table({title ,columns , data , tableActions , rowActions}:{title:string,columns:TableColumn[],data:any[],tableActions?:TableAction[] , rowActions?:RowAction[]}) {

    const [dataList  ,setDataList ] = useState<any[]>(data);
    const [rowsLimit , setRowsLimit] = useState(5);
    const [rowsToShow, setRowsToShow] = useState<any[]>(data.slice(0,rowsLimit));
    const [customPagination, setCustomPagination] = useState<any[]>([]);
    const [totalPage , setTotalPage] = useState(Math.ceil(data.length / rowsLimit));
    const [currentPage, setCurrentPage] = useState(0);
    const [isRefresh , setIsRefresh] = useState(false);

    const nextPage = () => {
        const startIndex = rowsLimit * (currentPage + 1);
        const endIndex = startIndex + rowsLimit;
        const newArray = dataList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(currentPage + 1);
    };
    const changePage = (value:any) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = dataList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(value);
    };
    const previousPage = () => {
        const startIndex = (currentPage - 1) * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = dataList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          setCurrentPage(0);
        }
    };
    useMemo(() => {
        setCustomPagination(
          Array(Math.ceil(dataList?.length / rowsLimit)).fill(null)
        );
      }, []);

    const refreshList =async () => {
        setIsRefresh(!isRefresh); 
    }
    
    return (
        <div className="w-full  flex  items-center justify-center my-4">
            <div className="w-full max-w-4xl px-2">
                    <div className="flex items-center justify-between">
                        <div className="min-w-20 flex flex-row gap-1">
                          {tableActions?.slice(0,2).filter(elm => elm.position==Position.LEFT).map((elm,index) => (
                             <div key={index} onClick={elm.action} className={`bg-gray-100 py-1 text-center rounded-sm border border-gray-400 cursor-pointer hover:bg-gray-200 p-2 ${elm.classes??""}`}>
                                   {elm.isAction?<Spinner aria-label={elm.title} className="mx-auto" />:elm.title}
                             </div>
                          ))}
                        </div>
                            <h1 className="text-4xl w-fit mx-auto text-center">
                                {title}
                            </h1>
                        <div className="min-w-20 flex flex-row gap-1">
                        {tableActions?.slice(0,2).filter(elm => elm.position==Position.RIGHT).map((elm,index) => (
                             <div key={index} onClick={elm.action} className={`bg-gray-100 py-1 text-center rounded-sm border border-gray-400 cursor-pointer hover:bg-gray-200 p-2 ${elm.classes??""}`}>
                                   {elm.isAction?<Spinner aria-label={elm.title} className="mx-auto" />:elm.title}
                             </div>
                          ))}
                        </div>
                    </div>
                    <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                        <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
                              <thead className="rounded-lg text-base text-white font-semibold w-full">
                                    <tr className="bg-[#222E3A]/[6%]">
                                        {columns.map((elm,index) => (
                                             <th key={index} className={`py-3 px-3 text-[#212B36] sm:text-center font-bold whitespace-nowrap ${elm.classes}`}>
                                             {elm.title}
                                           </th>
                                        ))}
                                        {rowActions != null ? <th key={`${Date.now()}`} className={`py-3 px-3 text-[#212B36] sm:text-center font-bold whitespace-nowrap`}>Actions</th> : <></>}
                                    </tr>
                              </thead>
                              <tbody className="relative">
                                   {rowsToShow.map((elm,index) => (
                                    <tr
                                        className={`${
                                          index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                                        }`}
                                        key={index}
                                    >
                                        {columns.map((column,index) => (
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
                                              {column?.builder==null?
                                               (elm[column.key]??column.defaultValue).toString():
                                               column.builder(elm[column.key]??column.defaultValue)
                                              }
                                          </td>                                          
                                        ))}
                                        
                                        {rowActions != null ? <td key={`${Date.now()}`} className={`py-2 px-3 font-normal text-center flex justify-center gap-2 border-t-2 border-black whitespace-nowrap`}>
                                          {rowActions.map((action , index)=>(
                                                              <div key={index}>
                                                               <i onClick={(e)=>action.controller(elm)} className={`${action.icon} cursor-pointer mx-auto ${action.classes}`}></i> 
                                                             </div>
                                          ))}
                                        </td> : <></>}
                                          
                                    </tr>
                                   )
                                   )
                                   } 
                              </tbody>
                        </table>
                    </div>
                    <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                            <div className="text-sm text-gray-400">
                              Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                              {currentPage == totalPage - 1
                                ? dataList?.length
                                : (currentPage + 1) * rowsLimit}{" "}
                              of {dataList?.length} entries
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
    );
}
  