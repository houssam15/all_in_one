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
        console.log(data)
      }catch(err){
        console.error(err);
        return -2;
      }
}