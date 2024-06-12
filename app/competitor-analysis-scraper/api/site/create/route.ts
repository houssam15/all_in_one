import { NextRequest, NextResponse } from 'next/server';
import {createNewWebsite} from "../../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function POST (req:NextRequest){
    const result = await createNewWebsite((await req.json())?.url);
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({results:result.getResults()},{status: 200});
} 
