 import { NextRequest, NextResponse } from 'next/server';
 import  ScrapWebsite  from "../ScrapWebsite";


export async function POST (req){


    const data = await req.json();

    const {site} =  data
    console.log(site);
    const res = await ScrapWebsite(site);

    // console.log(res);

      return NextResponse.json({message: 'User created successfully',res:res},{status: 200});
    
} 


