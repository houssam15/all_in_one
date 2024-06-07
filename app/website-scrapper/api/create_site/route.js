import { NextRequest, NextResponse } from 'next/server';
import service from "@/app/website_scrapper/controller";
//http://localhost:3000/competitor_analysis_scraper/api/new_site
export async function POST (req){
    const data = await req.json();
   
} 
