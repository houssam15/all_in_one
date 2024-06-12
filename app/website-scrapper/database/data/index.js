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
      
      const data = await prisma.websiteScrapperSite.findUnique({
        where: {
          id: site.toString(),
        },
      });
        return data
      }catch(err){
        console.error(err);
        return false;
      }
}