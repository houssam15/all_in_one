import {createNewWebsite , getWebsiteVersion , updateWebsite} from "@/app/competitor_analysis_scraper/database/data";

export default async function NewWebsite(site:string){
    try{
        const version = await getWebsiteVersion(site);
        if(version<0 || typeof version !="number") throw new Error("database error");
        if(version==0) await createNewWebsite(site , version);
        return version;        
    }catch(err){
        return -1;
    }
}