"use server"
import Response from "../utils/response.class";
import { getPageAnalytics as getPageAnalyticsData} from "../../database/data";

export async function getPageAnalytics (page_id:string|null):Promise<Response>{
    var response = new Response();
    if(page_id==null) return response.addError("Page not valid !");
    const analytics = await getPageAnalyticsData(page_id);
    if(analytics==null) return response.addError("Error fetching analytics!");
   return response.setResults(analytics);
}