"use server"
import Browser from "../utils/browser.class";
import Response from "../utils/response.class";
import { getNotProccessedSitePages , updateSiteState, createPageAnalytic ,setSitePageasProccessed , getSiteAnalyticsProgress} from "../../database/data";

export async function getPagesAnalytics(site:string|null , max : string | null):Promise<Response>{
    var response = new Response();
    var browser = new Browser(max);
    if(browser.isUrlValid(site)==false) return response.setErrors(browser.getErrors());
    const data = await getNotProccessedSitePages(site as string);
    if(!data?.site || !data?.pages) {
        await updateSiteState(data.site.id , "COMPLETED");
        return response.addError("Can't get website pages !");}
    for(var page of data.pages){
        if((await createPageAnalytic(page,await browser.getPageAnalytic(page.url)))==null) return response.addErrors([...browser.getErrors(),"Can't save page analytic !"]); 
        else await setSitePageasProccessed(page); 
        if(data.pages.indexOf(page)+1==browser.getMax()) break;
    }
    const analytic_progress = await getSiteAnalyticsProgress(site as string);
    return response.setResults(analytic_progress);
}

