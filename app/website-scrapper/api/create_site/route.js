 

import { NextRequest, NextResponse } from 'next/server';

export async function POST (req){
  

        console.log(data);
        try {   
            const data = await req.json();
            const {site,status,description,seoPercentage,dateAt} = data;
               if(!site || !status || !description || !seoPercentage || !dateAt){
     return new NextResponse(JSON.stringify({ error: 'site, status, and description and seoPercentage  and dateAt  are required in the request body.' }),{status:400});
   }

            } catch (error) {
  console.error('Error connecting to the database:', error);
  return new NextResponse(JSON.stringify({error: 'Internal Server Error'}), {status: 500});
}
     //   try {   
//   const userdata = await req.json();

//   const {name,email,phone,password} = userdata;
//   if(!name || !email || !phone || !password){
//     return new NextResponse(JSON.stringify({ error: 'name, email, and password are required in the request body.' }),{status:400});
//   }

//   const newUser = await UserService.create_user({username:name , email:email , password:password , phone:phone});

//   return new NextResponse(JSON.stringify({/* id:  newUser.dataValues.id ,*/ message: 'User created successfully' }), {status: 200});
// } catch (error) {
//   console.error('Error connecting to the database:', error);
//   return new NextResponse(JSON.stringify({error: 'Internal Server Error'}), {status: 500});
// }
}