import { NextRequest, NextResponse } from 'next/server';
import services from "@/app/competitor_analysis_scraper/controller";

//http://localhost:3000/competitor_analysis_scraper/api/website_backlinks
export async function GET (req:NextRequest){
    const { searchParams } = req.nextUrl;
    const url = searchParams.get('url');
    if(url==null ||typeof url !="string" || url.length==0)
        return NextResponse.json({method:"Number of pages" , error:"missing or invalid url !"},{status: 400});
    const backlinks = await services.getWebsiteBacklinks({url});
    if(typeof backlinks =="number" &&  backlinks<0)
        return NextResponse.json({method:"Website backlinks" , error:"can't get website backlinks !"},{status: 400});
    return NextResponse.json({method:"Number of pages" ,number_of_pages:backlinks },{status: 200});
} 
