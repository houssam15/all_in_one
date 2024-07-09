"use client"
import React,{ useState, useEffect }  from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import {Table , ConfirmationModal , MyAlert} from "../components";
import {TableColumn , Position , AlertType} from "../types";
import { io, Socket } from 'socket.io-client';
import crypto from 'crypto';
import { Spinner } from "flowbite-react";

export default function WebsiteList() {
  const [columns , setColumns] = useState<TableColumn[]>([
    {key:"createdAt", title:"Date" , classes:"" , defaultValue:"-----"},
    {key:"speed", title:"Speed" , classes:"" , defaultValue:"-----"},
    {key:"totalPages", title:"Total pages" , classes:"" , defaultValue:"-----"},
    {key:"url", title:"Url" , classes:"" , defaultValue:"-----"},
    {key:"state", title:"State" , classes:"" , defaultValue:"-----" ,builder:(data:any)=>
      
       <div className="flex">
        
        {typeof data=="object" || data=="WORKING"?
          <div>                    
              <p className="text-xs">
                <Spinner className="mr-2"/> 
                <span>({data.progress??0}%)</span>
              </p> 
              <p className="text-sm text-blue-400 mx-auto">(WORKING)</p>
          </div>
          :data
        }
       </div>
     }
  ]);
  
  const [data , setData] = useState<any[]>([]);
  const [alertData,setAlertData] = useState<{messages:string[],type:AlertType}|null>(null);
  const [isRefresh , setIsRefresh] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{state :boolean , data:any}>({state:false , data :null});
  const [errorAlertDuration] = useState<number>(3000);
  const [isAutomate , setIsAutomate]  =useState(false);
  const [isCancel,setIsCancel] =useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<any>(null);

  useEffect(()=>{

    fetchWebsites();
    const socketIo = io(`${process.env.COMPETITOR_ANALYSIS_SCRAPPER_CRON_HOST}`);
    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log("connect ");
    });

    socketIo.on('disconnect', () => {
      console.log("disconnected ");
    });

    socketIo.on('analytics-started', (data: any) => {
      console.log("analytics-started ");
    });
    
    socketIo.on('analytics-stopped', (data: any) => {
      console.log("analytics-updated " ,null);
    }); 

    socketIo.on('analytics-completed',async () => {
      console.log("----------completed-------------")
      await refreshList();
    }); 

    socketIo.on('analytics-updated', (data: any) => {
      setData((prev)=>prev.map((row)=>row.id==data?.id?{...row , state:{progress:data.progress}}:row));
    });

    return () => {
      socketIo.disconnect(); // Disconnect socket on component unmount
    };
  },[]);

  const fetchWebsites = async () =>{
    try{
      const results = await fetch("/competitor-analysis-scraper/api/site/get-all",{
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const content = await results.json();
      if(results.status!==200) return setAlertData({messages:content?.errors||["internal server error"] , type:AlertType.ERROR});
      setData(content?.sites??[]);
      setAlertData({messages:["data loaded succesfully"] , type:AlertType.INFO});
    }catch(err){
      setAlertData({messages:["Internal server error !"] , type:AlertType.INFO});
    }
  }

  const refreshList =async () => {
    setIsRefresh(true);
    await fetchWebsites().finally(()=>setIsRefresh(false));
  }

  const automateAnalytics =async () => {
    setIsAutomate(true);
    try{
      const result = await fetch("/competitor-analysis-scraper/api/cron/start");
      if(result.status!==200) return setAlertData({messages:(await result.json())?.errors||["internal server error"] , type:AlertType.WARNING});
      setAlertData({messages:(await result.json())?.data , type:AlertType.INFO});
    }finally{
      setIsAutomate(false)
    }
  }

  const cancelAnalyze =async () => {
    setIsCancel(true);
    try{
      const result = await fetch("/competitor-analysis-scraper/api/cron/stop");
      if(result.status!==200) return setAlertData({messages:(await result.json())?.errors||["internal server error"] , type:AlertType.WARNING});
      setAlertData({messages:(await result.json())?.data , type:AlertType.WARNING});
    }finally{
      setIsCancel(false)
    }
  }

  const deleteSite = async (site:any)=>{
    try{
      const result = await fetch("/competitor-analysis-scraper/api/site/delete?id="+site?.id);
      if(result.status!==200) return setAlertData({messages:(await result.json())?.errors||["internal server error"] , type:AlertType.ERROR});
      await refreshList();
      setAlertData({messages:["Deleted succesfully !"] , type:AlertType.INFO});
    }catch(err){
      setAlertData({messages:["Internal server error !"] , type:AlertType.ERROR});
    }
  }

  const analyzeSite = async(data:any)=>{
    const result = await fetch(`/competitor-analysis-scraper/api/site/set-site-state?site_id=${data.id}&status=WORKING`);
    if(result.status!==200) return setAlertData({messages:(await result.json())?.errors||["internal server error"] ,type:AlertType.ERROR});
      await refreshList();
      setAlertData({messages:["automate analyze by click \"auto analyzing\" !"] , type:AlertType.INFO});
   }

  const getPages = async(data:any)=>{
    const result = await fetch(`/competitor-analysis-scraper/api/pages/get-website-pages?url=${data.url}`);
    if(result.status!==200) return setAlertData({messages:(await result.json())?.errors||["internal server error"] ,type:AlertType.ERROR});
    setAlertData({messages: [(await result.json())?.data.message], type:AlertType.INFO});
  }

   const inializeState = async(data:any)=>{
    const result = await fetch(`/competitor-analysis-scraper/api/site/set-site-state?site_id=${data.id}&status=NEW`);
      if(result.status!==200) return setAlertData({messages:(await result.json())?.errors||["internal server error"] , type:AlertType.ERROR});
      await refreshList();
      setAlertData({messages:["State Inialized succesfully !"] , type:AlertType.INFO});
   }

   const hashData = (data: any) => {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
   };

  return (
      <>
      <div className={`min-h-80`}>
        <div className={`${alertData?"flex relative bg-gray-100":""} items-center w-full h-14`}>
        {alertData && <MyAlert alertData={alertData} hideDuration={errorAlertDuration} hideAction={()=>setAlertData(null)}/>}
        </div>
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
            key={hashData(data)} // Adding a key to force re-render when data length changes
            title="My Websites"
            columns={columns}
            data={data}
            tableActions={[
                {title:"refresh",position: Position.RIGHT ,isAction:isRefresh , action : refreshList ,classes:"w-20"},
                {title:"Analyze site",position: Position.LEFT ,isAction:isAutomate , action : automateAnalytics ,classes:`w-32`},
                {title:"Cancel",position: Position.LEFT ,isAction:isCancel , action : cancelAnalyze ,classes:`w-24`},
            ]}
            rowActions={[
              { 
                icon:"fa-regular fa-trash-can" ,
                controller : (site:any)=>setDeleteDialog({state:true , data:site}) ,
                classes:"text-red-600 hover:scale-110",
                helpText:"delete website"
              },
              //{ icon:"",controller : analyzeSite , classes:"text-blue-600 hover:scale-110"},
              {
                icon:"fa-solid fa-hammer",
                controller:analyzeSite ,
                classes:"text-blue-600 hover:scale-110",
                helpText:"change state to \"WORKING\""
              },
              {
                icon:"fa-solid fa-arrows-rotate",
                controller:inializeState ,
                classes:"text-green-600 hover:scale-110",
                helpText:"change state to \"NEW\""
              },
               {
                 icon:"fa-solid fa-layer-group",
                 controller:getPages ,
                 classes:"text-yellow-600 hover:scale-110",
                 helpText:"get pages"
               }
            ]}
          />
      </div>
      </>
  );
}


