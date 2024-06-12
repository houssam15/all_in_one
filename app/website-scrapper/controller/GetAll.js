"use server"
import {GetAllBase} from "./../database/data";
export  async function getAllWebsites(){
    try{
 
  


       const res = await GetAllBase();
 
         return res;
       
    }catch(err){
        return false;
    }
}