"use server"
import Response from "../utils/response.class";
import { getAllSites as getAllSitesData} from "../../database/data";

export async function getAllSites ():Promise<Response>{
    var response = new Response();
    const sites = await getAllSitesData();
    if(sites==null) return response.addError("Error fetching sites!");
   return response.addResult(sites);
}