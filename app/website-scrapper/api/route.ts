import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
export async function GET (req:NextRequest){

    try {     

      return NextResponse.json({message: 'User created successfully'},{status: 200});
    } catch (error) {
      return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
} 


