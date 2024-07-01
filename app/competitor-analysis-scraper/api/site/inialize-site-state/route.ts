import { NextRequest, NextResponse } from 'next/server';
import {inializeSiteState} from "../../../controller";
//http://localhost:3000/competitor-analysis-scrapper/api/site/inialize-site-state?site_id=xxx
export async function GET (req:NextRequest){
    const result = await inializeSiteState(req.nextUrl.searchParams.get('site_id'));
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({results:result.getResults()},{status: 200});
} 
