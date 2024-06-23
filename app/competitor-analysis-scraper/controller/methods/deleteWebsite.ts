"use server"
import Response from "../utils/response.class";
import { deleteWebsite as deleteWebsiteData} from "../../database/data";

export async function deleteWebsite (id:string):Promise<Response>{
    var response = new Response();
    const result = await deleteWebsiteData(id);
    if(result==null) return response.addError("can't delete website !");
   return response.addResult("deleted successfully !");
}