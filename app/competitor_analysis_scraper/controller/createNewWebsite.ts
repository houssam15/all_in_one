import {createNewWebsite , getWebsiteVersion , updateWebsite} from "@/app/competitor_analysis_scraper/database/data";

export default async function NewWebsite(site:string){
    try{
        //check if already exist
        const version = await getWebsiteVersion(site);
        if(version<0) throw new Error("database error");
        if(version==1) await createNewWebsite(site , version);
        else await updateWebsite(site , version);
        return 1;        
    }catch(err){
        return -1;
    }
}