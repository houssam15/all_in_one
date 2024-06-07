
import { RouteType } from "./type";
import fs from "fs";
import path from "path";

class Route {
    protected routes: Array<RouteType> = [];

    searchFile(dir:string){
        const files = fs.readdirSync(dir);
        files.forEach((file)=>{
            console.log(path.join(dir,file));
            if(fs.statSync(path.join(dir,file)).isDirectory() && fs.statSync(path.join(dir,file,"/config/menu.ts")).isFile()){
                console.log("PASSED");
            }
        })
    }

    getRoutes(){
        return this.routes;
    }
}

export default Route;