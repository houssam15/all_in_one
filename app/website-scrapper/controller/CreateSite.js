"use server"
import {createSiteBase} from "./../database/data";
export  async function createNewWebsite(site){
    try{
     
       const res = await createSiteBase("test","descriptions","dd",10,"27-25-20")
       
       console.log(res);
       return true;
       
    }catch(err){
        return -1;
    }
}