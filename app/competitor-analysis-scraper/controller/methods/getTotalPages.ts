"use server"
import puppeteer from "puppeteer";


export  async function getTotalPages({url} : getTotalPagesParams) : Promise<any>{
    try{
        const b = await puppeteer.launch();
        const p = await b.newPage();
        await p.goto(url, { waitUntil: 'networkidle0' });
        const pc = await p.evaluate(() => {
        return document.getElementsByTagName('a').length;
        });
        await b.close();
        return pc;
    }catch(err){
        console.error(err);
        return -1;
    }
}


interface getTotalPagesParams {
    url : Required<string>;
}