"use server"
import Browser from "../utils/browser.class";
import Response from "../utils/response.class";
import { getNotProccessedSitePages , createPageAnalytic ,setSitePageasProccessed} from "../../database/data";

export async function getPagesAnalytics(site:string|null , max : string | null):Promise<Response>{
    var response = new Response();
    var browser = new Browser(max);
    if(browser.isUrlValid(site)==false) return response.setResults(browser.getErrors());
    const pages = await getNotProccessedSitePages(site as string);
    if(pages==null) return response.addError("Can't get website pages !");
    for(var page of pages){
        if((await createPageAnalytic(page,await browser.getPageAnalytic(page.url)))==null) return response.addErrors([...browser.getErrors(),"Can't save page analytic !"]); 
        else await setSitePageasProccessed(page); 
        if(pages.indexOf(page)+1==browser.getMax()) break;
    }   
    return response.addResult({message : "analytics saved successfully !"});
}

