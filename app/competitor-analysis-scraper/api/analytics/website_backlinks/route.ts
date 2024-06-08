import { NextRequest, NextResponse } from 'next/server';
import services from "@/app/competitor_analysis_scraper/controller";

//http://localhost:3000/competitor_analysis_scraper/api/analytics/website_backlinks
export async function GET (req:NextRequest){
    const response = {module : "competitor_analysis_scraper" , api:"/analytics/website_backlinks" , description:"get website backlinks"}
    const url = req.nextUrl.searchParams.get('url');
    if(url==null ||typeof url !="string" || url.length==0)
        return NextResponse.json({...response, data:{error:"missing or invalid url !"}},{status: 400});
    const backlinks = await services.getWebsiteBacklinks({url});
    if(typeof backlinks =="number" &&  backlinks<0)
        return NextResponse.json({...response,data: {error:"can't get website backlinks !"}},{status: 400});
    return NextResponse.json({...response,data:{number_of_pages:backlinks} },{status: 200});
} 
