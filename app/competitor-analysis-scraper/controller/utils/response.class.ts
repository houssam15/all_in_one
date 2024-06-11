export default class Response {
    private results:any[] = [];
    private errors:string[] = [];

    public addError(error:string){
        this.errors.push(error);
        return this;
    }

    public addErrors(errors : string[]){
        for(var error of errors){
            if(!this.errors.includes(error)) this.addError(error);
        }
        return this;
    }

    public setErrors(errors : string[]){
        this.errors = errors;
        return this;
    }

    public getErrors(){
        return this.errors;
    }

    public addResult(result:any){
        this.results.push(result);
        return this;
    }

    public setResults(results : any[]){
        this.results = results;
        return this;
    }

    public hasErrors() : boolean{
        return this.errors.length>0;
    }

    public getResults() {
        return this.results;
    }

}