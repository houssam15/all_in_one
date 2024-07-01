"use client"
import React, { useEffect, useState } from "react";
import {Table , MyAlert} from ".";
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
    return (
       <div className={`min-h-80`}>
        <div className={`${alertData?"flex relative bg-gray-100":""} items-center w-full h-14`}>
                {alertData && <MyAlert alertData={alertData} hideDuration={errorAlertDuration} hideAction={()=>setAlertData(null)}/>}
        </div>
       <Table 
          key={hashData(data)}
          title={"Pages"}
          columns={columns} 
          data={data} 
          tableActions={
            [
              {title:"refresh",position: Position.RIGHT ,isAction:isRefresh , action : refreshList , classes:"w-20"},
             // {title:"analyze all",position: Position.LEFT ,isAction:isAnalyze , action : analyzeAll , classes:"w-32"},
            ]
          }
          /*rowActions={
            [
                {
                    icon:"fa-solid fa-magnifying-glass-chart",
                    controller:()=>console.log("TEST") ,
                    classes:"text-blue-600 hover:scale-110"
                },
                {
                    icon:"fa-solid fa-chart-line",
                    controller:()=>console.log("TEST") ,
                    classes:"text-green-600 hover:scale-110"
                }
            ]
          }*/
        />
        </div>
    );
}
  