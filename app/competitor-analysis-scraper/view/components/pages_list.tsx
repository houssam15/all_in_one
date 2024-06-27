"use client"
import React, { useEffect, useState } from "react";
import {Table , ErrorAlert} from ".";
import {TableColumn , Position } from "../types";

export default function PagesList() {  
    const [columns , setColumns] = useState<TableColumn[]>([
        {key:"site", title:"Site" , classes:"" , defaultValue:"-----"},
        {key:"url", title:"Page" , classes:"" , defaultValue:"-----"},
        {key:"is_proccessed", title:"Is proccessed" , classes:"" , defaultValue:"-----",
         builder:(data:any)=>(data==true?<i className="fa-solid fa-check text-red-600"></i>:<i className="fa-solid fa-xmark text-blue-500"></i>) 
        },
    ]);
    const [data , setData] = useState<any[]>([]);
    const [errors,setErrors] = useState<string[]|null>(null);
    const [isRefresh , setIsRefresh]  =useState(false);
    const [isAnalyze , setIsAnalyze]  =useState(false);
    const [errorAlertDuration] = useState<number>(3000);

    useEffect(()=>{
        fetchPages();
    },[]);

    const fetchPages= async ()=>{
        try{
            const result = await fetch("/competitor-analysis-scraper/api/pages/get-all");
            const content =  await result.json();
            if(result.status!==200) return setErrors(content?.errors);
            setData( content.pages||[]);
        }catch(err){
            setErrors(["Internal server error !"]);
        }
    }

    const refreshList = async()=>{
       setIsRefresh(true);
       await fetchPages().finally(()=>setIsRefresh(false));
    }

    const analyzeAll = async()=>{
        setIsAnalyze(true);
        setTimeout(()=>{
            setIsAnalyze(false)
        },3000)
     }
     
    return (
       <div className={`min-h-80 ${errors?"relative":""}`}>
       {errors && <ErrorAlert errors={errors} hideDuration={errorAlertDuration} hideAction={()=>setErrors([])}/>}
       <Table 
          key={data.length}
          title={"Pages"}
          columns={columns} 
          data={data} 
          tableActions={
            [
              {title:"refresh",position: Position.RIGHT ,isAction:isRefresh , action : refreshList , classes:"w-20"},
              {title:"analyze all",position: Position.LEFT ,isAction:isAnalyze , action : analyzeAll , classes:"w-32"},
            ]
          }
          rowActions={
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
          }
        />
        </div>
    );
}
  