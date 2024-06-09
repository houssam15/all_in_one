"use server"
import {createNewWebsite as createNewWebsiteData, getWebsiteVersion , updateWebsite} from "../../database/data";
export  async function createNewWebsite(site:string){
    try{
        const version = await getWebsiteVersion(site);
        if(version<0 || typeof version !="number") throw new Error("database error");
        if(version==0) await createNewWebsiteData(site , version);
        return version;        
    }catch(err){
        return -1;
    }
}