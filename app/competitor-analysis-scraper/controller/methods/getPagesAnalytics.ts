"use server"
import Browser from "../utils/browser.class";
import Response from "../utils/response.class";
import { getSitePages , createPageAnalytic } from "../../database/data";

export async function getPagesAnalytics (site:string,max:string|null):Promise<Response>{
    var response = new Response();
    var browser = new Browser(max);
    const pages = await getSitePages(site);
    for(var page of pages){
       const page_analytic =  await createPageAnalytic(await browser.getPageAnalytic(page));
        
    }
    return response;
}

