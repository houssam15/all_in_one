import { NextRequest, NextResponse } from 'next/server';
 import {createNewWebsite} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function POST (req){
    const response = {module : "website-scrapper" , api:"/create_site" , description:"add new website"}
    const data = await req.json();
    // if(typeof data?.url !="string")
    // return NextResponse.json({...response , data:{message:"url not found !"} },{status: 400});
    const res = await createNewWebsite("test","test");
    console.log(res);
    if(!res) 
      return NextResponse.json({...response , data :{ message : "failed !"}},{status: 400});
    return NextResponse.json({...response , data:{message : "created succesfully !" }},{status: 200});
 
  } 
