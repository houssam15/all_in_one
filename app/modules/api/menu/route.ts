import { NextRequest, NextResponse } from 'next/server';
import { getMenu } from '@/app/modules/controller';
//http://localhost:3000/modules/api/menu
export async function GET (req:NextRequest){
      const response = {module : "module" , api:"/ping" , description:"ping"}
      const menu = await getMenu();

      if(typeof menu == "number" && menu<0)
            return NextResponse.json({...response , data:{error : "Database Error : Can't get menu data"}},{status: 400});
      return NextResponse.json({...response , data:{menu}},{status: 200});
} 
