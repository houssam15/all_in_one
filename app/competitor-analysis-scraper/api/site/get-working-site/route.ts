import { NextRequest, NextResponse } from 'next/server';
import {getWorkingSites} from "../../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/get-working-site
export async function GET (req:NextRequest){
    const result = await getWorkingSites();
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors(),stopcron:true},{status: 400});
    return NextResponse.json({site:result.getResults()},{status: 200});
} 
