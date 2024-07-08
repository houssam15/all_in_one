import { NextRequest, NextResponse } from 'next/server';
import {setSiteState} from "../../../controller";
//http://localhost:3000/competitor-analysis-scrapper/api/site/set-site-state?site_id=xxx&status=xxxxx
export async function GET (req:NextRequest){
    const result = await setSiteState(req.nextUrl.searchParams.get('site_id') , req.nextUrl.searchParams.get('status'));
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({results:result.getResults()},{status: 200});
} 
