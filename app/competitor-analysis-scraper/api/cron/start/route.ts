import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

//http://localhost:3000/competitor-analysis-scraper/api/cron/start
export async function GET (req:NextRequest){
    const result = await axios.get(process.env.COMPETITOR_ANALYSIS_SCRAPPER_CRON_HOST + "/api/competitor-analysis-scraper/start-cron");
    if(result.data.status=="KO") return NextResponse.json({errors:["Already running !"] },{status: 400});
    return NextResponse.json({data:["Running ..."]},{status: 200});
}
