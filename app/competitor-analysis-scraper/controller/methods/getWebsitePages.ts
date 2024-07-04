"use server"
import Browser from "../utils/browser.class";
import Response from "../utils/response.class";
import { getSiteByUrl , saveSitePages } from "../../database/data";

export async function getWebsitePages (url:string|null , max:string|null):Promise<Response>{
    var response = new Response();
    var browser = new Browser();
    if(!(await browser.ifValidVisitUrl(url))) return response.setErrors(browser.getErrors()); 
    const site = await getSiteByUrl(url as string);
    if(site==null) return response.addError("add your website first !");
    if((await browser.getSitePages())==null) return response.addError("Can't get site pages !");
    const new_pages = await saveSitePages(site , browser.getPages());
    if(new_pages==null) return response.addError("Failed to save pages !");
    return response.setResults({message : `${browser.getPages().length} found${new_pages.length>0?" ,"+new_pages.length+' new page(s) saved succesfully !':''} .` ,/* all_pages:[browser.getPages()],new_pages : new_pages*/});
}