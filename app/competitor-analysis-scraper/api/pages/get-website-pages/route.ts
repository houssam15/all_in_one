import { NextRequest, NextResponse } from 'next/server';
import {getWebsitePages } from "../../../controller";

//http://localhost:3000/competitor-analysis-scraper/api/pages/get-website-pages?url=xxxx.com

export async function GET (req:NextRequest){
    const result = await getWebsitePages(req.nextUrl.searchParams.get('url'),req.nextUrl.searchParams.get('max'));
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({data:result.getResults()[0]},{status: 200});
}
