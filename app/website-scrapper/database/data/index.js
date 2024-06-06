import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function createSiteBase($site,date){
    try{
        const data = await prisma.websiteScrapperSite.create({
          data:{
            site:site,
            date : date,
          }
        });
        console.log(data)
      }catch(err){
        console.error(err);
        return -2;
      }
}