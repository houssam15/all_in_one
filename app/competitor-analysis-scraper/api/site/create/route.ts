import { NextRequest, NextResponse } from 'next/server';
import controller from "@/app/competitor_analysis_scraper/controller";
//http://localhost:3000/competitor_analysis_scraper/api/site/create
export async function POST (req:NextRequest){
    const response = {module : "competitor_analysis_scraper" , api:"/site/create" , description:"add new website"}
    const data = await req.json();
    if(typeof data?.url !="string")
    return NextResponse.json({...response , data:{message:"url not found !"} },{status: 400});
    const version = await controller.createNewWebsite(data.url);
    if(version<0) 
    return NextResponse.json({...response , data :{ message : "failed !"}},{status: 400});
    return NextResponse.json({...response , data:{message : "created succesfully !" , version}},{status: 200});
} 
