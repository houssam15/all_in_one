import { NextRequest, NextResponse } from 'next/server';
//http://localhost:3000/competitor-analysis-scraper/api/site/delete
export async function DELETE (req:NextRequest){
    const response = {module : "competitor-analysis-scraper" , api:"/site/delete" , description:"delete a website"}
    return NextResponse.json({ ...response , data : {}},{status: 200});
} 
