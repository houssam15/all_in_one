"use client"
import React,{ useState, useEffect }  from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import {Table} from ".";
import {Column , Position} from "../types";

export default function WebsiteList() {
  const [columns , setColumns] = useState<Column[]>([
    {key:"createdAt", title:"Date" , classes:"" , defaultValue:"-----"},
    {key:"speed", title:"Speed" , classes:"" , defaultValue:"-----"},
    {key:"totalPages", title:"Total pages" , classes:"" , defaultValue:"-----"},
    {key:"url", title:"Url" , classes:"" , defaultValue:"-----"},
    {key:"state", title:"State" , classes:"" , defaultValue:"-----"}
  ]);
  const [data , setData] = useState<any[]>([]);
  const [error , setError] = useState<string[]|null>(null);
  const [isRefresh , setIsRefresh] = useState(false);

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

    return (
      <div className="min-h-80">
        <Table 
            key={data.length} // Adding a key to force re-render when data length changes
            title="My Websites"
            columns={columns}
            data={data}
            actions={
              [
                {title:"refresh",position: Position.RIGHT ,isAction:isRefresh , action : refreshList ,classes:"w-20"},
              ]
            }
            />
      </div>
    );
  }
  

