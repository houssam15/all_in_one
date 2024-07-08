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

export async function getAllPagesFromSite(site) {

  try {

        const page = await prisma.websiteScrapperPage.findFirst({

          where: { site: site }

      });

      console.log(page);


      return page.data;

  } catch (err) {

      console.error(err);

      return null;

  }

}
export async function getAllImagesFromSite(site) {

  try {

        const image = await prisma.websiteScrapperImage.findFirst({

          where: { site: site }

      });

      console.log(image);


      return image.data;

  } catch (err) {

      console.error(err);

      return null;

  }

}
export async function getAllProcessedImages(site) {

  try {

        const image = await prisma.websiteScrapperProcessedImage.findFirst({

          where: { site: site }

      });

      console.log(image);


      return image.data;

  } catch (err) {

      console.error(err);

      return null;

  }

}
export async function getAllRessroucessFromSite(site) {

  try {

        const ressources = await prisma.websiteScrapperRessource.findFirst({

          where: { site: site }

      });

      console.log(ressources);


      return ressources.data;

  } catch (err) {

      console.error(err);

      return null;

  }

}

export async function SavePagesForSite(site, links) {
    try {
        const existingPage = await prisma.websiteScrapperPage.findFirst({
            where: { site: site }
        });

        let data;
        if (existingPage) {
            data = await prisma.websiteScrapperPage.update({
                where: { id: existingPage.id },
                data: {
                    data: links, // Update with new links
                },
            });
        } else {
            data = await prisma.websiteScrapperPage.create({
                data: {
                    site: site,
                    data: links, // Create with new links
                },
            });
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
export async function SaveProcessedPagesForSite(site, links) {
    try {
        const existingPage = await prisma.websiteScrapperProcessedPage.findFirst({
            where: { site: site }
        });

        let data;
        if (existingPage) {
            data = await prisma.websiteScrapperProcessedPage.update({
                where: { id: existingPage.id },
                data: {
                    data: links, // Update with new links
                },
            });
        } else {
            data = await prisma.websiteScrapperProcessedPage.create({
                data: {
                    site: site,
                    data: links, // Create with new links
                },
            });
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
export async function SaveProcessedRessroucessForSite(site, links) {
    try {
        const existingPage = await prisma.websiteScrapperProcessedRessource.findFirst({
            where: { site: site }
        });

        let data;
        if (existingPage) {
            data = await prisma.websiteScrapperProcessedRessource.update({
                where: { id: existingPage.id },
                data: {
                    data: links, // Update with new links
                },
            });
        } else {
            data = await prisma.websiteScrapperProcessedRessource.create({
                data: {
                    site: site,
                    data: links, // Create with new links
                },
            });
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
export async function SaveProcessedImagesForSite(site, links) {
    try {
        const existingPage = await prisma.websiteScrapperProcessedImage.findFirst({
            where: { site: site }
        });

        let data;
        if (existingPage) {
            data = await prisma.websiteScrapperProcessedImage.update({
                where: { id: existingPage.id },
                data: {
                    data: links, // Update with new links
                },
            });
        } else {
            data = await prisma.websiteScrapperProcessedImage.create({
                data: {
                    site: site,
                    data: links, // Create with new links
                },
            });
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
export async function SaveRessourcesForSite(site, links) {
    try {
        const existingRessource = await prisma.websiteScrapperRessource.findFirst({
            where: { site: site }
        });

        let data;
        if (existingRessource) {
            data = await prisma.websiteScrapperRessource.update({
                where: { id: existingRessource.id },
                data: {
                    data: links, // Update with new links
                },
            });
        } else {
            data = await prisma.websiteScrapperRessource.create({
                data: {
                    site: site,
                    data: links, // Create with new links
                },
            });
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}


export async function SaveImagesForSite(site, images) {
  try {
      const existingImage = await prisma.websiteScrapperImage.findFirst({
          where: { site: site }
      });

      let data;
      if (existingImage) {
          data = await prisma.websiteScrapperImage.update({
              where: { id: existingImage.id },
              data: {
                  data: images, // Update with new links
              },
          });
      } else {
          data = await prisma.websiteScrapperImage.create({
              data: {
                  site: site,
                  data: images, // Create with new links
              },
          });
      }
      return true;
  } catch (err) {
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