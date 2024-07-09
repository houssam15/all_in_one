import { NextRequest, NextResponse } from 'next/server';
import {createNewWebsite, processWebsite, getSite} from "../../controller";

 //http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET(req){
    const response = {module : "website-scrapper" , api:"/proccess_website" , action:"process a website"}


    
    const url =req.nextUrl.searchParams.get('site');

   

    const res = await processWebsite(url);

    // return NextResponse.json({ ...response, data: { message: site } }, { status: 200 });

    if(res) 
      return NextResponse.json({...response , site : url, data:res },{status: 200});
    if(!res) 
      return NextResponse.json({...response , data :{ message : "failed !"}},{status: 400});
   
 
  } 
