"use server"
import Response from "../utils/response.class";
import { getAllPages as getAllPagesData} from "../../database/data";

export async function getAllPages ():Promise<Response>{
    var response = new Response();
    const pages = await getAllPagesData();
    if(pages==null) return response.addError("Error fetching pages!");
    console.log(pages)
   return response.setResults(pages);
}