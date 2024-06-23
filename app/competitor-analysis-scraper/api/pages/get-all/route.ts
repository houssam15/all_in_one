import { NextRequest, NextResponse } from 'next/server';
import {getAllPages } from "../../../controller";

//http://localhost:3000/competitor-analysis-scraper/api/pages/get-all

export async function GET (req:NextRequest){
    const result = await getAllPages();
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({pages:result.getResults()},{status: 200});
}
