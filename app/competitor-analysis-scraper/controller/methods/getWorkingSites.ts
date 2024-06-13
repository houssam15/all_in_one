"use server"
import Response from "../utils/response.class";
import { getWorkingSite} from "../../database/data";

export async function getWorkingSites ():Promise<Response>{
    var response = new Response();
    const site = await getWorkingSite();
    if(site==null) return response.addError("All sites compelted !");
   return response.addResult(site.site);
}