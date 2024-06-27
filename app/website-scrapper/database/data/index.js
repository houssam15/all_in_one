import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function createSiteBase(site,description,status,seoPercentage,dateAt){
 
    try{
      
        const data = await prisma.websiteScrapperSite.create({
          data: {
            site: site,
            description: description, // Now this field is valid
            status: status,
            seoPercentage: seoPercentage,
            dateAt: dateAt
          }
        });
        return true
      }catch(err){
        console.error(err);
        return false;
      }
}

export async function SavePagesForSite(site,links){
 
    try{
      
        const data = await prisma.websiteScrapperPage.create({
          data: {
            site: site,
            data: links, // Now this field is valid
 
          }
        });
        return true
      }catch(err){
        console.error(err);
        return false;
      }
}
export async function SaveImagesForSite(site,images){
 
    try{
      
        const data = await prisma.websiteScrapperImage.create({
          data: {
            site: site,
            data: images, // Now this field is valid
 
          }
        });
        return true
      }catch(err){
        console.error(err);
        return false;
      }
}
export async function GetAllBase( ){
 
    try{
      
        const data = await prisma.websiteScrapperSite.findMany();
        return data
      }catch(err){
        console.error(err);
        return false;
      }
}
export async function GetSiteBase(site){
   
    try{
      
      const data = await prisma.websiteScrapperSite.findFirstOrThrow({ where : { site : site}});

      console.log(data)
        return data
      }catch(err){
        console.error(err);
        return false;
      }
}