"use server"
 import {SaveProcessedImagesForSite , getAllImagesFromSite} from "../database/data";
 

export async function processImages(site) {
 
    const Images = await getAllImagesFromSite(site);
    

    console.log(Images);
        const images = [];

        for (const image of Images) {
            const response = await fetch(image.src);
                 
            images.push({ src: image.src, broken: response.status !== 200, noAlt: !image.alt });
        }

        // console.log(images);


        // return true;
   
       
        // return true;
        const res = await SaveProcessedImagesForSite(site, images);
        if (res) {
            return { images };
        } else {
            return false;
        }

 
}
