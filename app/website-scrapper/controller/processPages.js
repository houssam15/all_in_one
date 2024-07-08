"use server"
 import {SaveProcessedPagesForSite , getAllPagesFromSite} from "../database/data";
 

export async function processPages(site) {
 
    const pages = await getAllPagesFromSite(site);
    

    console.log(pages);
        const links = [];

        for (const page of pages) {
            const response = await fetch(page);
                 const startTime = performance.now();
                await fetch(page);
                const endTime = performance.now();
                const pageSpeed = endTime - startTime;
                links.push({ url: page, broken: response.status !== 200, speed: pageSpeed });
        }
   
       
        // return true;
        const res = await SaveProcessedPagesForSite(site, links);
        if (res) {
            return { links };
        } else {
            return false;
        }

 
}
