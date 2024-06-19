import { NextRequest, NextResponse } from 'next/server';
import {createNewWebsite} from "../../../controller";
//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET (req:NextRequest){
    const result = await createNewWebsite(req.nextUrl.searchParams.get('url')??"");
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({results:result.getResults()[0]},{status: 200});
} 
