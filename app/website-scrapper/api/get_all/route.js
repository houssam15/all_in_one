import { NextRequest, NextResponse } from 'next/server';
 import {createNewWebsite, getAllWebsites} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET (req){
    const response = {module : "website-scrapper" , api:"/get_all" , action:"get all websites"}
 
    const data = await getAllWebsites();
    if(data) 
      return NextResponse.json({...response , data:data},{status: 200});
    if(!data) 
      return NextResponse.json({...response , data :{ message : "failed !"}},{status: 400});
   
 
  } 
