import { NextRequest, NextResponse } from 'next/server';
import {getWebsitePages } from "../../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/analytics/website_backlinks
export async function GET (req:NextRequest){
    const result = await getWebsitePages(req.nextUrl.searchParams.get('url'),req.nextUrl.searchParams.get('max'));
    if(result.isFailed()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({results:result.getResults()},{status: 200});
} 

