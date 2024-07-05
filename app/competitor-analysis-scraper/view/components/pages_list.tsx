"use client"
import React, { useEffect, useState } from "react";
import {Table , MyAlert, AnalyticModal , AnalyticChart} from "../components";
import {TableColumn , Position , AlertType } from "../types";
import crypto from 'crypto';

export default function PagesList() {  
    const [columns , setColumns] = useState<TableColumn[]>([
        {key:"site", title:"Site" , classes:"" , defaultValue:"-----"},
        {key:"url", title:"Page" , classes:"" , defaultValue:"-----"},
        {key:"is_proccessed", title:"Is proccessed" , classes:"" , defaultValue:"-----",
         builder:(data:any)=>(data==true?<i className="fa-solid fa-check text-red-600"></i>:<i className="fa-solid fa-xmark text-blue-500"></i>) 
        },
    ]);
    const [data , setData] = useState<any[]>([]);
    const [alertData,setAlertData] = useState<{messages:string[],type:AlertType}|null>(null);
    const [isRefresh , setIsRefresh]  =useState(false);
   // const [isAnalyze , setIsAnalyze]  =useState(false);
    const [errorAlertDuration] = useState<number>(3000);
    const [analyticDialog, setAnalyticDialog] = useState<{state :boolean , data:any}>({state:false , data :null});

    useEffect(()=>{
        fetchPages();
    },[]);

    const fetchPages= async ()=>{
        try{
            const result = await fetch("/competitor-analysis-scraper/api/pages/get-all");
            const content =  await result.json();
            if(result.status!==200) return setAlertData({messages:content?.errors , type:AlertType.ERROR});
            setData( content.pages||[]);
            setAlertData({messages:["data loaded succesfully"] , type:AlertType.INFO});
        }catch(err){
            setAlertData({messages:["Internal server error !"] , type:AlertType.ERROR});
        }
    }

    const refreshList = async()=>{
       setIsRefresh(true);
       await fetchPages().finally(()=>setIsRefresh(false));
    }

    // const analyzeAll = async()=>{
    //     setIsAnalyze(true);
    //     setTimeout(()=>{
    //         setIsAnalyze(false)
    //     },3000)
    //  }
     
    const hashData = (data: any) => {
        return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
    };

    const loadPageAnalytics =async (data:any) => {
        try{
            const result = await fetch(`/competitor-analysis-scraper/api/pages/get-page-analytics?page_id=${data.id}`);
            const content =  await result.json();
            if(result.status!==200) return setAlertData({messages:content?.errors , type:AlertType.ERROR});
            //setData( content.pages||[]);
            console.log(content);
            setAnalyticDialog({state:true ,data:content});

        }catch(err){
            setAlertData({messages:["Internal server error !"] , type:AlertType.ERROR});
        }
    }

    const getSpeeds = (data:any) => {
        return data.data?.map((elm:any) => elm["speed"]);
    }

    return (
       <div className={`min-h-80`}>
        <div className={`${alertData?"flex relative bg-gray-100":""} items-center w-full h-14`}>
                {alertData && <MyAlert alertData={alertData} hideDuration={errorAlertDuration} hideAction={()=>setAlertData(null)}/>}
        </div>
        {analyticDialog.state &&
           <AnalyticModal 
              cancel={()=>setAnalyticDialog({state:false , data:null})}
              content={(
              <div className="m-3 h-full box-border">
                
                <div className="pt-4 text-lg font-bold text-gray-600"> Analytics </div>
                <div className="w-full h-[90%] grid grid-rows-2">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-lg font-bold text-gray-400 mb-2">Speed</div>
                              <AnalyticChart data={getSpeeds(analyticDialog.data)}/> 
                        </div>
                        <div className="bg-blue-500"></div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="bg-green-300"></div>
                        <div className="bg-green-500"></div>
                    </div>
                </div>

              </div>
              )}/>
        }
       <Table 
          key={hashData(data)}
          title={"Pages"}
          columns={columns} 
          data={data} 
          tableActions = {
            [
              {title:"refresh", position: Position.RIGHT , isAction:isRefresh , action : refreshList , classes:"w-20"},
            ]
          }
          rowActions={
            [
                {
                    icon:"fa-solid fa-magnifying-glass-chart",
                    controller:loadPageAnalytics,
                    classes:"text-blue-600 hover:scale-110",
                    helpText:"show analytics"
                },
            ]
          }
        />
        </div>
    );
}
  