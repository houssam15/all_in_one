import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET (req:NextRequest){
    const result = await axios.get(process.env.COMPETITOR_ANALYSIS_SCRAPPER_CRON_HOST + "/api/competitor-analysis-scraper/stop-cron");
    return NextResponse.json({status:result.status,data:result.data  },{status: 200});
}