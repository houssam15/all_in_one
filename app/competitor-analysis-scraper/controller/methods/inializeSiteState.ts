

"use server"
import Response from "../utils/response.class";
import { updateSiteStateAndHisPages } from "../../database/data";

export async function inializeSiteState(siteId:string|null):Promise<Response>{
    var response = new Response();
    if(isMongoDbId(siteId)==false) return response.addError("Id not valid !");
    if((await updateSiteStateAndHisPages(siteId as string))==null) return response.addError("Can't update site state !");
    return response.addResult({ message : "Inialized successfully" ,  });
}

function isMongoDbId(siteId:string|null){
    const regex = new RegExp(/^[a-fA-F0-9]{24}$/);
    return siteId!=null && regex.test(siteId);
}
