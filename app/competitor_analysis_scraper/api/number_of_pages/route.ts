import { NextRequest, NextResponse } from 'next/server';
import services from "@/app/competitor_analysis_scraper/services";

//http://localhost:3000/competitor_analysis_scraper/api/number_of_pages
export async function GET (req:NextRequest){
    const { searchParams } = req.nextUrl;
    const url = searchParams.get('url');
    console.log(url==null ||typeof url !="string" || url.length==0)
    if(url==null ||typeof url !="string" || url.length==0)
        return NextResponse.json({status: 'Ok',method:"Number of pages" , error:"missing or nvalid url !"},{status: 400});
    const np = await services.getTotalPages({url});
    if(np<0)
        return NextResponse.json({status: 'Ok',method:"Number of pages" , error:"can't get number of pages !"},{status: 400});

      return NextResponse.json({status: 'Ok',method:"Number of pages" ,number_of_pages:url },{status: 200});
} 
