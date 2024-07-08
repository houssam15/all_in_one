"use server"
import Response from "../utils/response.class";
import { setSiteState as setSiteStateData  , getWorkingSite ,Data}  from "../../database/data";
import { Status } from "@prisma/client";

export async function setSiteState(siteId:string|null , status : string|null):Promise<Response>{
    var response = new Response();
    var data = new Data();
    if(isMongoDbId(siteId)==false) return response.addError("Id not valid !");
    if(status==null || !["NEW","WORKING"].includes(status)) return response.addError("Invalid state !");
    if(status=="WORKING" && (await data.getWorkingSite(true))!=null) return data; 
    if((await setSiteStateData(siteId as string , status as Status))==null) return response.addError("Can't update site state !");
    return response.setResults({ message : "state updated successfully"});
}

function isMongoDbId(siteId:string|null){
    const regex = new RegExp(/^[a-fA-F0-9]{24}$/);
    return siteId!=null && regex.test(siteId);
}
