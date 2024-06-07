import { HiUserCircle , HiGlobe  } from "react-icons/hi";
import { CiGlobe , CiUser } from "react-icons/ci";
import { RouteType } from "./type";


class Route {
    // protected routes : Array<RouteType> = [
    //     { route : "/social-media-scrapper" , name:"Social media scrapper" , icon : HiUserCircle , active:false , childrens:[] },
    // ];

    protected routes: Array<RouteType> = [
        {
            route: "/social-media-scrapper/pages/general",
            name: "Social media scrapper",
            icon: CiUser,
            active: false,
            childrens: [],
        },
        {
            route: "/website-scrapper/view/ping",
            name: "Website Scrapper",
            icon: CiGlobe ,
            active: false,
            childrens: [],
        },

    
    ];

    getRoutes(){
        return this.routes;
    }

}

export default Route;