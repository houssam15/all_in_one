import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

//http://localhost:3000/competitor-analysis-scraper/api/cron/start
export async function GET (req:NextRequest){
    const result = await axios.get(process.env.COMPETITOR_ANALYSIS_SCRAPPER_CRON_HOST + "/api/competitor-analysis-scraper/start-cron");
    return NextResponse.json({status:result.status,data:result.data  },{status: 200});
}
