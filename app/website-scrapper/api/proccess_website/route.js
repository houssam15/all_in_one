import { NextRequest, NextResponse } from 'next/server';
 import {createNewWebsite, getAllWebsites,proccessWebsite} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET (req){
    const response = {module : "website-scrapper" , api:"/get_all" , action:"get all websites"}
 
    const data = req.json() ;

    const {site } = data;

    const res = await proccessWebsite(site);

    if(res) 
      return NextResponse.json({...response , data:{message : "proccessing"}},{status: 200});
    if(!res) 
      return NextResponse.json({...response , data :{ message : "failed !"}},{status: 400});
   
 
  } 
