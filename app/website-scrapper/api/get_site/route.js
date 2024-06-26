import { NextRequest, NextResponse } from 'next/server';
 import {createNewWebsite, getAllWebsites, getSite} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET (req){
    const response = {module : "website-scrapper" , api:"/get_site" , action:"get website"}

    const site =req.nextUrl.searchParams.get('site');
   
    console.log(site);
    const res = await getSite(site);
    // const res = false;
    
    if(res) 
      return NextResponse.json({...response , data:res},{status: 200});
    if(!res) 
      return NextResponse.json({...response , res :{ message : "failed !"}},{status: 400});
   
 
  } 
