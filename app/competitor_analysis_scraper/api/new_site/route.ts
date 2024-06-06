import { NextRequest, NextResponse } from 'next/server';
import service from "@/app/competitor_analysis_scraper/controller";
//http://localhost:3000/competitor_analysis_scraper/api/new_site
export async function POST (req:NextRequest){
    const data = await req.json();
    if(typeof data?.url !="string")
    return NextResponse.json({message:"url not found !" },{status: 400});
    if((await service.createNewWebsite(data.url))<0) 
    return NextResponse.json({message : "failed !"},{status: 400});
    return NextResponse.json({message : "created succesfully !"},{status: 200});
} 
