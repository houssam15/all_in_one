"use client"
import React,{ useState, useEffect }  from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import {Table , ConfirmationModal , ErrorAlert} from ".";
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
  const [errors , setErrors] = useState<string[]>([]);
  const [isRefresh , setIsRefresh] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{state :boolean , data:any}>({state:false , data :null});
  const [errorAlertDuration] = useState<number>(3000);
  useEffect(()=>{
    fetchWebsites();
  },[]);

  const fetchWebsites = async () =>{
    try{
      const results = await fetch("/competitor-analysis-scraper/api/site/get-all");
      const content = await results.json();
      if(results.status!==200) return setErrors(content?.errors||["internal server error"]);
      setData(content?.sites??[]);
    }catch(err){
      setErrors(["Internal server error !"]);
    }
  }

  const refreshList =async () => {
    setIsRefresh(true);
    await fetchWebsites().finally(()=>setIsRefresh(false));
  }

  const deleteSite = async (site:any)=>{
    try{
      const result = await fetch("/competitor-analysis-scraper/api/site/delete?id="+site?.id);
      if(result.status!==200) return setErrors((await result.json())?.errors||["internal server error"]);
      await refreshList();
    }catch(err){
      setErrors(["Internal server error !"]);
    }
  }

  return (
      <div className={`min-h-80 ${errors?"relative":""}`}>
        {errors && <ErrorAlert errors={errors} hideDuration={errorAlertDuration} hideAction={()=>setErrors([])}/>}
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
                icon:"fa-regular fa-trash-can" ,
                controller : (site:any)=>setDeleteDialog({state:true , data:site}) ,
                classes:"text-red-600 hover:scale-110"
              }
            ]}
          />
      </div>
  );
}


