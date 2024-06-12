import { NextRequest, NextResponse } from 'next/server';
 import {createNewWebsite} from "./../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function POST (req){
    const response = {module : "website-scrapper" , api:"/create_site" , action:"new website"}
    const data = await req.json();

    const {site , description } = data ;
    if(!site || !description)
      return NextResponse.json({...response , data:{message:"site and description required !"} },{status: 400});
    const res = await createNewWebsite(site,description);
    if(res)
      return NextResponse.json({...response , data:{message : "created succesfully !" }},{status: 200});
    if(!res) 
      return NextResponse.json({...response , data :{ message : "failed !"}},{status: 400});
   
 
  } 
