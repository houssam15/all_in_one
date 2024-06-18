import { NextRequest, NextResponse } from 'next/server';
import {getWebsitePages } from "../../../controller";

//http://localhost:3000/competitor-analysis-scraper/api/pages/get-pages?url=xxxx.com

export async function GET (req:NextRequest){
    const result = await getWebsitePages(req.nextUrl.searchParams.get('url'),req.nextUrl.searchParams.get('max'));
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({results:result.getResults()},{status: 200});
}
