"use client"
import React, { useEffect, useState } from "react";
import {Table} from ".";
import {Column , Position} from "../types";

export default function PagesList({width }:{width:string}) {  
    const [columns , setColumns] = useState<Column[]>([
        {key:"id", title:"ID" , classes:""},
        {key:"is_proccessed", title:"Is proccessed" , classes:""},
        {key:"siteId", title:"Site id" , classes:""},
        {key:"url", title:"Url" , classes:""}
    ]);
    const [data , setData] = useState<any[]>([]);
    const [errors,setErrors] = useState<string[]|null>([]);
    const [isRefresh , setIsRefresh]  =useState(false);

    const fetchPages= async ()=>{
       try{ 
            const result = await fetch("/competitor-analysis-scraper/api/pages/get-all");
            const content = await result.json();
            if(result.status!==200) return showMessage(content , 3000);
            setData(typeof content.pages!=undefined? content.pages:[]);
       }catch(err){
            console.error('Error fetching pages:',err);
       }
    }

    useEffect(()=>{
        fetchPages();
    },[]);

    const showMessage = (data:any,delay:number)=>{
        setErrors(data?.errors);
       setTimeout( () => setErrors(null), delay );
    }

    const refreshList = async()=>{
        setIsRefresh(true);
        await fetchPages();
        setIsRefresh(false);
    }

    return (
        <div className={`${width} h-full relative`}>
            {errors!=undefined && errors?.length>0 && <div className="absolute top-1 w-full h-14">
                    {errors?.map(error => (
                        <div className="w-1/2 mx-auto bg-red-200  rounded-sm p-2 text-center">
                            {error}
                        </div>
                    ))
                     }
            </div>}
            <Table columns={columns} data={data} actions={[{key:1,title:"refresh",position: Position.RIGHT ,isAction:isRefresh , action : refreshList}]}/>
        </div>
    );
}
  