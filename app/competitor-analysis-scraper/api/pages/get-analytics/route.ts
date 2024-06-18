import { NextRequest, NextResponse } from 'next/server';
import {getPagesAnalytics } from "../../../controller";

//http://localhost:3000/competitor-analysis-scraper/api/pages/get-analytics?url=xxxx.com

export async function GET (req:NextRequest){
    const result = await getPagesAnalytics(req.nextUrl.searchParams.get('url') , req.nextUrl.searchParams.get('max') );
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json(result.getResults()[0],{status: 200});
}