"use server"
import {createNewSite , getSiteByUrl} from "../../database/data";
import Browser from "../utils/browser.class";
import Response from "../utils/response.class";
export  async function createNewWebsite(url:string):Promise<Response>{
        var response = new Response();
        var browser = new Browser();
        if(!(await browser.ifValidVisitUrl(url))) return response.setErrors(browser.getErrors()) ; 
        if((await getSiteByUrl(url))!=null) return response.addError("Website already exist !");
        const new_site = await createNewSite(url);
        if(new_site == null) return  response.addError("Can't add your website , try later !"); 
        return response.addResult({ message : "Created successfully" , data : new_site });
}