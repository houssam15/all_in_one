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
    if(site.state=="NEW") await updateSiteState(site.id,"WORKING");
    const pages = await prisma.competitorAnalysisScraperPage.findMany({where:{siteId : site.id , is_proccessed:false}});
    if(pages.length==0) await updateSiteState(site.id,"COMPLETED");
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

export async function updateSiteState(siteId : any,state:any): Promise<any>{
  try{ 
    return await prisma.competitorAnalysisScraperSite.update({
      where:{ id:siteId } , data : { state : state } });
  }catch(err){
    return null;
  }
}

export async function getWorkingSite(): Promise<any>{
  try{ 
    return await prisma.competitorAnalysisScraperSite.findFirst({
      where:{ state:"WORKING" }});
  }catch(err){
    return null;
  }
}


export async function updateSiteStateAndHisPages(siteId:string): Promise<any>{
  try{
    const site = await prisma.competitorAnalysisScraperSite.findFirstOrThrow({where:{id:siteId}});
    await prisma.competitorAnalysisScraperPage.updateMany({where:{siteId:site.id} , data:{is_proccessed:false}});
    return await prisma.competitorAnalysisScraperSite.update({where:{id:site.id} , data:{state:'NEW'}});
  }catch(err){
    return null;
  }
}


export async function getSiteAnalyticsProgress(url:string): Promise<number|null>{
  try{
    const site = await getSiteByUrl(url);
    if(site==null) throw new Error("Site not found !");
      const total_pages = await prisma.competitorAnalysisScraperPage.findMany({where:{siteId:site.id}});
      const proccessed_pages = await prisma.competitorAnalysisScraperPage.findMany({where:{siteId:site.id , is_proccessed:true}});
      return (proccessed_pages.length/total_pages.length)*100;
  }catch(err){
    return null;
  }
}


