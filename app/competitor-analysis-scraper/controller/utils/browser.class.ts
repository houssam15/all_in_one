import puppeteer from "puppeteer";
import axios from "axios";
export default class Browser {
    private browser : any = null; 
    private page : any =null;
    private errors :string[] = [];
    private results:any[]= [];
    private pages:string[] = [];
    private max:number = 5;

    constructor(max:string|null=null){
      this.max = !isNaN(Number(max)) && Number(max)>0? Number(max):this.max;
    }

    public getErrors(){
      return this.errors;
    }
    
    public getResults(){
      return this.results;
    }
    
    public getPages(){
      return this.pages;
    }

    public setPages(pages:string[]){
       this.pages = pages;
       return this;
    }

    public getMax(){
      return this.max;
    }

    addResult(result:any){
      this.results.push(result);
      return this;
    }

    public addError(error:Required<string>){
      this.errors.push(error);
      return this;
    }

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
  
    public  isFailed() : boolean{
      return this.getErrors().length > 0;
    }   
  
    public isUrlValid(url:any,push:boolean=true):boolean{
      try{
        var regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
        const isValid :boolean = regex.test(url);
        if(!isValid && push) this.addError("Invalid Url format");
        return isValid;

      }catch(err){
        return false;
      }
    }

    protected async isUrlReachable(url:any , push:boolean=true):Promise<boolean>{
      try{
        await (await this.getPage()).goto(url, { waitUntil: 'networkidle0' });
        return true;
      }catch(err){
        if(push) this.addError("Url not reachable");
        return false ;
      }
    }

    public async ifValidVisitUrl(url:Required<string|null> , push:boolean = true):Promise<boolean>{

         if(this.isUrlValid(url , push) && (await this.isUrlReachable(url , push))) return true;
         else return false;
    } 

    removeDuplicates<T>(arr: T[]): T[] {
      return Array.from(new Set(arr));
    }
    
    protected  async closeBrowser(){
      await ( await this.getBrowser()).close();
    }

    getHostName(url:string){
      try{
        return (new URL(url)).hostname;
      }catch(err){
        return null;
      }
    }

    async getGoogleAnalytics(url:Required<string>):Promise<{speed:number ,availability : string }>{
      try{
        const { data } = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=mobile`);
        return {speed : data.lighthouseResult.categories.performance.score ,availability : data.loadingExperience.overall_category};
      }catch(err){
        return {speed:0,availability:"NONE"}
      }
    }
    


    public async analyzeSitePages(pages:string[]) : Promise<void>{
        for(var link of pages){
          await this.getPageAnalytic(link);
          if(pages.indexOf(link)+1==this.getMax())
            break;
        }
        await this.closeBrowser();
    }

    public async getSitePages():Promise<any>{
      try{
        var pages : string[] = await Promise.all(
          Array.from(await (await this.getPage()).$$eval('a', (links: any) => links.map((link:any) => (link.href))))
        ); 
        this.setPages(this.removeDuplicates(pages).filter(elm => elm.startsWith('https') || elm.startsWith('http')));
        return this;
      }catch(err){
        return null;
      }
    }
    
    public async getPageAnalytic(url:string) : Promise<any>{
      try{
        var result : any ={};
          const data = await this.getGoogleAnalytics(url);
          result.is_accessible = await this.ifValidVisitUrl(url , false);
          result.speed=data.speed;
          result.availability=data.availability;
          result.hostname=this.getHostName(url);
          result.link = url;
          return result;
      }catch(err:any){
        return null;
      }
    }

 
  }