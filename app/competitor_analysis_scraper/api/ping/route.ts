import { NextRequest, NextResponse } from 'next/server';
//http://localhost:3000/competitor_analysis_scraper/api/ping
export async function GET (req:NextRequest){
      //test database
      return NextResponse.json({status: 'Ok',method:"Ping"},{status: 200});
} 
