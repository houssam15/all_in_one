import { NextRequest, NextResponse } from 'next/server';
import controller from "@/app/competitor_analysis_scraper/controller";
//http://localhost:3000/competitor_analysis_scraper/api/site/delete
export async function DELETE (req:NextRequest){
    const response = {module : "competitor_analysis_scraper" , api:"/site/delete" , description:"delete a website"}
    return NextResponse.json({ ...response , data : {}},{status: 200});
} 
