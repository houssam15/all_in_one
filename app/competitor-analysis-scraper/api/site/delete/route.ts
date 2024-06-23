import { NextRequest, NextResponse } from 'next/server';
import {deleteWebsite} from "../../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/delete
export async function GET (req:NextRequest){
    const result = await deleteWebsite(req.nextUrl.searchParams.get('id')??"");
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({data:result.getResults()},{status: 200});
} 
