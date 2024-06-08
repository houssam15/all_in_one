import { NextRequest, NextResponse } from 'next/server';
//http://localhost:3000/competitor_analysis_scraper/api/ping
export async function GET (req:NextRequest){
      const response = {module : "competitor_analysis_scraper" , api:"/ping" , description:"ping"}
      return NextResponse.json({...response , data:{}},{status: 200});
} 
