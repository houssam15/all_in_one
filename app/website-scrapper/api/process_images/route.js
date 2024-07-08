import { NextRequest, NextResponse } from 'next/server';
 import {processImages} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET (req){
    const response = {module : "website-scrapper" , api:"/process_images" , action:"process images"}

    const site =req.nextUrl.searchParams.get('site');
   
    console.log(site);
    const res = await processImages(site);
  
    if(res) 
      return NextResponse.json({...response ,status:true,progress:"DONE", data: {res: res ,   } },{status: 200});
    if(!res) 
      return NextResponse.json({...response ,status:false,progress:"Error", res :{ message : "failed !"}},{status: 400});
   
 
  } 
