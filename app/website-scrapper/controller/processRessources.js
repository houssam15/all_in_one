"use server"
 import {SaveProcessedRessroucessForSite , getAllProcessedImages} from "../database/data";
 

export async function getProcessedImages(site) {
 
    const Ressroucess = await getAllProcessedImages(site);
         if (Ressroucess) {
            console.log(Ressroucess);
            return { Ressroucess };
        } else {
            return false;
        }

}
