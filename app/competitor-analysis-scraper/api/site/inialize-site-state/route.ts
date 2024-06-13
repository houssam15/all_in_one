import { NextRequest, NextResponse } from 'next/server';
import {inializeSiteState} from "../../../controller";

export async function GET (req:NextRequest){
    const result = await inializeSiteState(req.nextUrl.searchParams.get('site_id'));
    if(result.hasErrors()) return NextResponse.json({errors:result.getErrors()},{status: 400});
    return NextResponse.json({results:result.getResults()},{status: 200});
} 
