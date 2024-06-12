import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function createNewSite(site: string ){
  try{
    return await prisma.competitorAnalysisScraperSite.create({ data : { site : site }});
  }catch(err){
    return null;
  }
}


export async function getSiteByUrl(url:string):Promise<any>{
  try{
    return await prisma.competitorAnalysisScraperSite.findFirstOrThrow({ where : { site : url}});
  }catch(err){ 
    return null 
  }
}


export async function saveSitePages(site:any , pages : string[]):Promise<string[]|null>{
  try{
    var new_urls:string[] = [];
    for(var page of pages){
   
        const pg = await prisma.competitorAnalysisScraperPage.findFirst({where:{url : page}});
        if(pg!=null) continue;
        await prisma.competitorAnalysisScraperPage.create({data:{
          siteId : site.id,
          url : page,
        }});
        new_urls.push(page); 
    }
    return new_urls;
  }catch(err){
    return null;
  }
}

export async function getNotProccessedSitePages(url:string):Promise<any[]|null>{
  try{
    const site = await getSiteByUrl(url);
    if(site==null) throw new Error("Site not exist");
    const pages = await prisma.competitorAnalysisScraperPage.findMany({where:{siteId : site.id , is_proccessed:false}});
    return pages;
  }catch(err){
    return null;
  }
}

export async function createPageAnalytic(page:any,analytic : any) : Promise<any>{
  try{ 
    return await prisma.competitorAnalysisScraperPageAnalytic.create({data : {
        pageId:page.id,
        is_accessible : analytic.is_accessible,
        speed : analytic.speed,
        availability : analytic.availability,
      }});
  }catch(err){
    return null;
  }
}


export async function setSitePageasProccessed(page:any) : Promise<any>{
  try{ 
    return await prisma.competitorAnalysisScraperPage.update({
      where:{ id:page.id } , data : { is_proccessed : true } });
  }catch(err){
    return null;
  }
}
