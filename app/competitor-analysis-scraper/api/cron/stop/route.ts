import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET (req:NextRequest){
    const result = await axios.get(process.env.COMPETITOR_ANALYSIS_SCRAPPER_CRON_HOST + "/api/competitor-analysis-scraper/stop-cron");
    if(result.data.status=="KO") return NextResponse.json({errors:["Already Stop !"] },{status: 400});
    return NextResponse.json({data:["Stop successfully"]  },{status: 200});
}