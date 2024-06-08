import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// export async function createBackLink(site:string,data:any ){
//   try{

  
//     const link = await prisma.competitorAnalysisScraper.create({
//         data: {
//           site : site,
//           url: data['url'],
//           type: data["type"],
//           anchorText: data["anchorText"],
//           sourceDomain: data['sourceDomain'],
//           sourcePage: data['sourcePage'],
//           pageSpeed: data['pageSpeed'],
//           pageAvailability: data['pageAvailability'],
//         },
//       });
//    return link;
//     }catch(err){
//       console.error(err);
//       return -1;
//     }
// }


// export async function deleteBySite(site: string){
//     const cnt = await prisma.competitorAnalysisScraper.deleteMany({
//       where : { site : { equals : site } },
//     });
//     return cnt;
// }


export async function createNewWebsite(site: string , version : number){
  try{
    const data = await prisma.competitorAnalysisScraperSite.create({
      data:{
        site:site,
        version : version,
      }
    });
    return data;
  }catch(err){
    console.error(err);
    return -2;
  }
}


export async function getWebsiteVersion(site :string){
  try{
    const website = await prisma.competitorAnalysisScraperSite.findFirst({
      where : { site : site },
    });
    if(website==null) return 0;
    return website.version;
  }catch(err){
    console.error(err);
    return -2;
  }
}

export async function updateWebsite(site :string , version:number){
  try{
    const updatedWebsite = await prisma.competitorAnalysisScraperSite.updateMany({
      where: { site: site },
      data: { version: version },
    });
    return updatedWebsite;
  }catch(err){
    console.error(err);
    return -2;
  }
}




