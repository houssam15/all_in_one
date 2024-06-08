import puppeteer from "puppeteer";

export default class Browser {
    private browser : any = null; 
    private page : any =null;
    private errors :string[] = [];
    private results:any[]= [];
  
    protected async getBrowser(){
      if(this.browser==null)
        this.browser = await puppeteer.launch();
      return this.browser;
    }
  
    protected async getPage() : Promise<any>{
      if(this.page ==null)
        this.page = (await this.getBrowser()).newPage();
      return this.page;
    }
  
    protected addError(error:Required<string>){
      this.errors.push(error);
      return this.errors;
    }
  
    public getErrors(){
      return this.errors;
    }

    public getResults(){
      return this.results;
    }
  
    public  isFailed() : boolean{
      return this.getErrors().length > 0;
    }   
  
    protected isUrlValid(url:any):boolean{
      var regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
      const isValid :boolean = regex.test(url);
      if(!isValid) this.addError("Invalid Url format");
      return isValid;
    }

    protected async isUrlReachable(url:any):Promise<boolean>{
      try{
        await (await this.getPage()).goto(url, { waitUntil: 'networkidle0' });
        return true;
      }catch(err){
        this.addError("Url not reachable");
        return false;
      }
    }

    public async isParamsValid(url:Required<string|null>):Promise<boolean>{
         if(this.isUrlValid(url) && (await this.isUrlReachable(url))) return false;
         else return true;
    } 

    public async getPages(url:Required<string>){
      try{
        //get all links
        var all_links = await Promise.all(
          Array.from(await (await this.getPage()).$$eval('a', (links: any) => links.map((link:any) => (link.href))))
        ); 
        //remove duplicate links
        console.log(all_links.length)
        console.log(this.removeDuplicates(all_links).length )
        //visit every link 

        //collect results about every link

        const visited_pages = new Set<string>();
        const pages_to_visite = [url];
        while(pages_to_visite.length>0){
          const url_to_visit = pages_to_visite.pop();
          if(url_to_visit && !visited_pages.has(url_to_visit)){
            try{
              await (await this.getPage()).goto(url, { waitUntil: 'networkidle0' });
              visited_pages.add(url);
              const links = (await this.getPage()).eval('a',(anchors: any) => anchors.map((anchor: any) => anchor.href));
              console.log(links)
            }catch(err:any){
              console.error(`Error visiting ${url_to_visit}: ${err.message}`);
            }
          }
        }
      }catch(err){
        this.addError(`can't get "${url}" pages !`);
      }
    }


    protected  async closeBrowser(){
      await ( await this.getBrowser()).close();
    }

    removeDuplicates<T>(arr: T[]): T[] {
      return Array.from(new Set(arr));
    }
  }


    /*try{
        const b = await puppeteer.launch();
        const p = await b.newPage();
        await p.goto(url, { waitUntil: 'networkidle0' });
        const bl = await Promise.all(
            Array.from(await p.$$eval('a', links => links.map(link => ({
              href: link.href,
              rel: link.hasAttribute('rel') ? link.getAttribute('rel') : null,
              textContent: link.textContent?.trim()
            })))).map(async (link) => {
              try {
                 const { data } = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${link.href}&strategy=mobile`);
                return {
                  url: link.href,
                  type: link.rel?.includes('nofollow') ? 'nofollow' : 'dofollow',
                  anchorText: link.textContent,
                  sourceDomain : (new URL(link.href)).hostname,
                  sourcePage : link.href,
                  pageSpeed: data.lighthouseResult.categories.performance.score,
                  pageAvailability: data.loadingExperience.overall_category
                };
              } catch (error) {
                console.error(`Error fetching metrics for ${link.href}: `, error);
                return {
                  url: link.href,
                  type: link.rel?.includes('nofollow') ? 'nofollow' : 'dofollow',
                  anchorText: link.textContent,
                  sourceDomain : (new URL(link.href)).hostname,
                  sourcePage : link.href,
                };
              }
            })
          );
        await b.close();
        //save in db
        for(let elm in bl){
           // await createBackLink(url,elm);
        }
        return bl;
    }catch(err){
        console.error(err);
        return -1;
    }*/