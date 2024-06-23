import { NextRequest, NextResponse } from 'next/server';
 import {createNewWebsite, getAllWebsites, getSite} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function POST (req){
    const response = {module : "website-scrapper" , api:"/get_site" , action:"get website"}

    const data = await req.json();


    return NextResponse.json({...response , data:data},{status: 200});


    const {site} = data;

  
    const res = await getSite(site);
    if(res) 
      return NextResponse.json({...response , data:data},{status: 200});
    if(!res) 
      return NextResponse.json({...response , data :{ message : "failed !"}},{status: 400});
   
 
  } 
