"use server"
import {GetSiteBase} from "./../database/data";
export  async function getSite(site){
    try{
 
  


       const res = await GetSiteBase(site);
        console.log(res);
         return res;
       
    }catch(err){
        return false;
    }
}