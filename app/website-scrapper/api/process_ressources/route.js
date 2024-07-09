// import { NextRequest, NextResponse } from 'next/server';
//  import {processRessources} from "./../../controller";
// //http://localhost:3000/competitor-analysis-scraper/api/site/create
// export async function GET (req){
//     const response = {module : "website-scrapper" , api:"/process_ressources" , action:"process ressources"}

//     const site =req.nextUrl.searchParams.get('site');
   
//     console.log(site);
//     const res = await processRessources(site);

//     if(res) 
//       return NextResponse.json({...response ,status:true,progress:"DONE", data: {res: res ,   } },{status: 200});
//     if(!res) 
//       return NextResponse.json({...response ,status:false,progress:"Error", res :{ message : "failed !"}},{status: 400});
   
 
//   } 
