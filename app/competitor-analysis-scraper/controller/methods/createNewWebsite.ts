"use server"
import {createNewSite, getWebsiteVersion , updateWebsite , getSiteByUrl} from "../../database/data";
import Browser from "../utils/browser.class";
import Response from "../utils/response.class";
export  async function createNewWebsite(url:string):Promise<Response>{
        var response = new Response();
        var browser = new Browser();
        //check site validity
        if(!(await browser.ifValidVisitUrl(url))) return response.setErrors(browser.getErrors()) ; 
        //check if it already exist in db
        if((await getSiteByUrl(url))!=null) return response.addError("Website already exist !");
        //create new website
        const new_site = await createNewSite(url , 0);
        if(new_site == null) return  response.addError("Can't add your website , try later !"); 

        return response.addResult({ message : "Created successfully" , data : new_site });
}