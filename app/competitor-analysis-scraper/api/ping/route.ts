import { NextRequest, NextResponse } from 'next/server';
//http://localhost:3000/competitor-analysis-scraper/api/ping
export async function GET (req:NextRequest){
    return NextResponse.json({api:"/ping" , state:"OK"},{status: 200});
} 
