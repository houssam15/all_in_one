"use server"
import Browser from "../utils/browser.class";

export async function getWebsitePages (url:string|null , max:string|null):Promise<Browser>{

    var browser = new Browser(max);
        if(!(await browser.isParamsValid(url))){
            throw new Error("Invalid params");
        } 
        const pages = await browser.getPages(url as string , );
    return browser;
}


