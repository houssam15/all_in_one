"use client"
import React,{ useState, useMemo }  from "react";
const products = [
    {
      id: 1,
      Category: "Electronics",
      Company: "Apple",
      Product: "iPhone 13",
      Description: "The latest iPhone with advanced features",
      Price: 999,
      CustomDetails: [
        {
          Date: "2023-09-05",
          Customer: "John Doe",
          Quantity: 2,
          TotalAmount: 1998,
        },
        {
          Date: "2023-09-04",
          Customer: "Jane Smith",
          Quantity: 1,
          TotalAmount: 999,
        },
      ],
    },
    {
      id: 2,
      Category: "Clothing",
      Company: "Nike",
      Product: "Running Shoes",
      Description: "High-quality running shoes for athletes",
      Price: 89,
      CustomDetails: [
        {
          Date: "2023-09-05",
          Customer: "Alice Johnson",
          Quantity: 3,
          TotalAmount: 267,
        },
        {
          Date: "2023-09-03",
          Customer: "Bob Brown",
          Quantity: 2,
          TotalAmount: 178,
        },
      ],
    },
    {
      id: 3,
      Category: "Books",
      Company: "Penguin Books",
      Product: "The Great Gatsby",
      Description: "Classic novel by F. Scott Fitzgerald",
      Price: 12,
      CustomDetails: [
        {
          Date: "2023-09-02",
          Customer: "Ella Williams",
          Quantity: 5,
          TotalAmount: 60,
        },
      ],
    },
    {
      id: 4,
      Category: "Home Appliances",
      Company: "Samsung",
      Product: "Smart Refrigerator",
      Description: "Refrigerator with smart features and spacious design",
      Price: 14,
      CustomDetails: [
        {
          Date: "2023-09-05",
          Customer: "David Wilson",
          Quantity: 1,
          TotalAmount: 14,
        },
      ],
    },
    {
      id: 5,
      Category: "Electronics",
      Company: "Sony",
      Product: "PlayStation 5",
      Description: "Next-gen gaming console",
      Price: 499,
      CustomDetails: [
        {
          Date: "2023-09-06",
          Customer: "Sarah Davis",
          Quantity: 1,
          TotalAmount: 499,
        },
      ],
    },
    {
      id: 6,
      Category: "Clothing",
      Company: "Adidas",
      Product: "Sneakers",
      Description: "Stylish sneakers for everyday wear",
      Price: 75,
      CustomDetails: [
        {
          Date: "2023-09-07",
          Customer: "Michael Lee",
          Quantity: 2,
          TotalAmount: 150,
        },
      ],
    },
    {
      id: 7,
      Category: "Electronics",
      Company: "Samsung",
      Product: "4K Smart TV",
      Description: "High-quality 4K television with smart features",
      Price: 799,
      CustomDetails: [
        {
          Date: "2023-09-08",
          Customer: "Sophia Anderson",
          Quantity: 1,
          TotalAmount: 799,
        },
      ],
    },
]
export default function WebsiteList() {
    const [productList] = useState(products);
  const [rowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(productList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState<any>([]);
  const [totalPage] = useState(Math.ceil(productList?.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value:any) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, []);
    return (
        <div className="w-full  flex min-h-80 items-center justify-center my-5">
            <div className="w-full max-w-4xl px-2">
        <div>
          <h1 className="text-4xl w-fit mx-auto mb-5">
          My websites
          </h1>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  ID
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Date
                </th>
                <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Speed
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Total pages
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Url
                </th>
                <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
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
                    className={`py-2 px-3 font-normal text-base ${
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
                    className={`py-2 px-3 font-normal text-base ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.Category}
                  </td>
                  <td
                    className={`py-2 px-3 font-normal text-base ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.Company}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.Product}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } min-w-[250px]`}
                  >
                    {data?.Description}
                  </td>
                  <td
                    className={`py-5 px-4 text-base  font-normal ${
                      index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}
                  >
                    {"$" + data?.Price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          <div className="text-lg">
            Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage == totalPage - 1
              ? productList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {productList?.length} entries
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
  

