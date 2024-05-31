import { HiUserCircle } from "react-icons/hi";
import { RouteType } from "./type";


class Route {
    // protected routes : Array<RouteType> = [
    //     { route : "/social-media-scrapper" , name:"Social media scrapper" , icon : HiUserCircle , active:false , childrens:[] },
    // ];

    protected routes: Array<RouteType> = [
        {
            route: "#",
            name: "Social media scrapper",
            icon: HiUserCircle,
            active: false,
            childrens: [
                {
                    route: "/social-media-scrapper/social-media",
                    name: "Social media",
                    icon: HiUserCircle,
                    active: false,
                    childrens: [
                        {
                            route: "/social-media-scrapper/social-media/facebook",
                            name: "Facebook",
                            icon: HiUserCircle,
                            active: false,
                            childrens: [],
                        },
                    ],
                },
            ],
        },

    
    ];

    getRoutes(){
        return this.routes;
    }

}

export default Route;