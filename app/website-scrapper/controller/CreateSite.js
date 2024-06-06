import {createWebsiteBase } from "@/app/website_scapper/database/data";

export default async function CreateWebsite(site,date){
    try{
    

        const res = await createWebsiteBase(site , version);
        return true ;
    }catch(err){
       return false
    }
}