import { NextRequest, NextResponse } from 'next/server';
 import {getRessources} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET (req){
    const response = {module : "website-scrapper" , api:"/get_ressources" , action:"get ressources"}

    const site =req.nextUrl.searchParams.get('site');
   
    

    const res = await getRessources(site);
  
    if(res) 
      return NextResponse.json({...response ,status:true,progress:"DONE", data:res},{status: 200});
    if(!res) 
      return NextResponse.json({...response ,status:false,progress:"Error", res :{ message : "failed !"}},{status: 400});
   
 
  } 
