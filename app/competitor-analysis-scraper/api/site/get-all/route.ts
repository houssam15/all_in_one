import { NextRequest, NextResponse } from 'next/server';
import {getAllSites} from "../../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/get-all
export async function GET (req:NextRequest){
    const result = await getAllSites();
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({data:result.getResults()},{status: 200});
} 
