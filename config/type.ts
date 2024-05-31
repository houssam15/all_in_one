import { IconType } from 'react-icons';
export interface RouteType {
    route : string,
    name : string,
    icon : IconType,
    active : boolean,
    childrens : Array<RouteType>
}