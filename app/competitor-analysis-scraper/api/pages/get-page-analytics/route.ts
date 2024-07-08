import { NextRequest, NextResponse } from 'next/server';
import {getPageAnalytics } from "../../../controller";

//http://localhost:3000/competitor-analysis-scraper/api/pages/get-page-analytics?page_id=xxxx.com

export async function GET (req:NextRequest){
    const result = await getPageAnalytics(req.nextUrl.searchParams.get('page_id'));
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({data:result.getResults()},{status: 200});
}
