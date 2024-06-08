import Browser from "../utils/browser.class";

export default async function getWebsitePages(url:string|null):Promise<Browser>{
    const browser = new Browser();
    try{
        if(!(await browser.isParamsValid(url))){
            console.log("PASS")
           // throw new Error("Invalid params");
        } 
        const pages = await browser.getPages(url as string);
    }catch(err:any){
        console.error(err);
    }   
    return browser; 
}