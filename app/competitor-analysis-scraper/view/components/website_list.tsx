"use client"
import React,{ useState, useEffect }  from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import {Table , ConfirmationModal} from ".";
import {TableColumn , Position} from "../types";

export default function WebsiteList() {
  const [columns , setColumns] = useState<TableColumn[]>([
    {key:"createdAt", title:"Date" , classes:"" , defaultValue:"-----"},
    {key:"speed", title:"Speed" , classes:"" , defaultValue:"-----"},
    {key:"totalPages", title:"Total pages" , classes:"" , defaultValue:"-----"},
    {key:"url", title:"Url" , classes:"" , defaultValue:"-----"},
    {key:"state", title:"State" , classes:"" , defaultValue:"-----"}
  ]);
  const [data , setData] = useState<any[]>([]);
  const [error , setError] = useState<string[]|null>(null);
  const [isRefresh , setIsRefresh] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{state :boolean , data:any}>({state:false , data :null});

  const showMessage = (data:any,delay:number)=>{
     setError(data?.errors);
    setTimeout( () => setError(null), delay );
  }

  const fetchWebsites = async () =>{
    const results = await fetch("/competitor-analysis-scraper/api/site/get-all");
    const content = await results.json();
    if(results.status!==200) return showMessage(content,3000);
    setData(content?.sites??[]);
  }

  useEffect(()=>{
    fetchWebsites();
  },[]);

  const refreshList =async () => {
    setIsRefresh(true);
    await fetchWebsites();
    setIsRefresh(false);
  }

  const deleteSite = async (site:any)=>{
    const result = await fetch("/competitor-analysis-scraper/api/site/delete?id="+site?.id);
    if(result.status!==200) return showMessage(await result.json(),3000);
    await refreshList();
  }

 

    return (
      <div className={`min-h-80 ${error?"relative":""}`}>
        {error && (
          <div className="absolute top-1 w-full">
            {error.slice(0, 2).map((elm, index) => (
              <div key={index} className="w-1/2 mx-auto bg-red-200 rounded-sm p-2 text-center">
                {elm}
              </div>
            ))}
          </div>
        )}
        {deleteDialog.state &&
           <ConfirmationModal 
              data={deleteDialog.data}
              confirm={deleteSite}
              cancel={()=>setDeleteDialog({state:false , data:null})}
              content={(
              <>
                <i className="fa-regular fa-trash-can"></i>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  delete "{deleteDialog.data?.url}" ?
                </p>
              </>
              )}/>
        }

        <Table 
            key={data.length} // Adding a key to force re-render when data length changes
            title="My Websites"
            columns={columns}
            data={data}
            tableActions={[
                {title:"refresh",position: Position.RIGHT ,isAction:isRefresh , action : refreshList ,classes:"w-20"},
              ]}
            rowActions={[
              { 
                icon:"fa-solid fa-trash" ,
                controller : (site:any)=>setDeleteDialog({state:true , data:site}) 
              }
            ]}
            />
      </div>
    );
  }
  

