"use client"
import React, { useEffect, useState } from "react";
import {Table} from ".";
import {Column , Position} from "../types";

export default function PagesList({width }:{width:string}) {  
    const [columns , setColumns] = useState<Column[]>([
        {key:"id", title:"ID" , classes:"" , defaultValue:"-----"},
        {key:"is_proccessed", title:"Is proccessed" , classes:"" , defaultValue:"-----"},
        {key:"siteId", title:"Site id" , classes:"" , defaultValue:"-----"},
        {key:"url", title:"Url" , classes:"" , defaultValue:"-----"}
    ]);
    const [data , setData] = useState<any[]>([]);
    const [errors,setErrors] = useState<string[]|null>([]);
    const [isRefresh , setIsRefresh]  =useState(false);
    
    const fetchPages= async ()=>{
       try{ 
            const result = await fetch("/competitor-analysis-scraper/api/pages/get-all");
            const content = await result.json();
            if(result.status!==200) return showMessage(content , 3000);
            console.log("--------0.0-------" , data)
            console.log("--------0.1-------" ,typeof content.pages!=undefined? content.pages:[]);
            setData( content.pages||[]);
            console.log("--------1-------" , data)
       }catch(err){
            console.error('Error fetching pages:',err);
       }
    }

    useEffect(() => {
        console.log("Updated data:", data); // Log data whenever it changes
    }, [data]);

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
        console.log("--------2-------" , data)
        setIsRefresh(false);
    }
     
    return (
        <div className={`${width} relative`}>
            {errors!=undefined && errors?.length>0 && <div className="absolute top-1 w-full h-14">
                    {errors?.map((error,index) => (
                        <div key={index} className="w-1/2 mx-auto bg-red-200  rounded-sm p-2 text-center">
                            {error}
                        </div>
                    ))
                     }
            </div>}
            <Table 
                key={data.length}
                title={"Pages"}
                columns={columns} 
                data={data} 
                actions={
                    [
                      {title:"refresh",position: Position.RIGHT ,isAction:isRefresh , action : refreshList , classes:"w-20"},
                    ]
                }
            />
        </div>
    );
}
  