import { NextRequest, NextResponse } from 'next/server';
import controller from "@/app/competitor-analysis-scraper/controller";

//http://localhost:3000/competitor-analysis-scraper/api/analytics/number_of_pages
export async function GET (req:NextRequest){
    const response = {module : "competitor-analysis-scraper" , api:"/analytics/number_of_pages" , description:"get website pages number"}
    const url = req.nextUrl.searchParams.get('url');
    if(url==null ||typeof url !="string" || url.length==0)
        return NextResponse.json({...response ,data: {error:"missing or invalid url !"}},{status: 400});
    const np = await controller.getTotalPages({url});
    if(np<0)
        return NextResponse.json({...response ,data:{ error:"can't get number of pages !"}},{status: 400});
    return NextResponse.json({...response ,data: {number_of_pages:np }},{status: 200});
} 
