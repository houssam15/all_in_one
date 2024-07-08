"use server"
import {createSiteBase} from "./../database/data";
export  async function createNewWebsite(site,description){
    try{
 
        
        const status = "empty"
        const seoPercentage = 0
        const dateAt = new Date().toISOString()

      
       const res = await createSiteBase(site,description,status,seoPercentage,dateAt)
 
      return res;
       
    }catch(err){
        return false;
    }
}