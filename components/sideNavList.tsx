"use client"
import { useState , useEffect } from "react";
import { ListGroup } from "flowbite-react";
import { HiChevronDown, HiChevronUp, HiUserCircle } from "react-icons/hi";
import Link from "next/link";
import Route from "../config/route";
import { RouteType } from "../config/type";
//dépanage
export default function SideNavList() {
    const [openRoutes, setOpenRoutes] = useState<{ [key: string]: boolean }>({});
    const routes = new Route();

    useEffect(() => {
      setOpenRoutes({});
    }, []);

    const toggleChildren = (route: string) => {
        setOpenRoutes(prevState => ({
            ...prevState,
            [route]: !prevState[route]
        }));
    };

    const renderRoutes = (routes: Array<RouteType>) => {
        return routes.map((elm) => (
            <ListGroup

              key={elm.route}>
                <ListGroup.Item>
                    <div className="flex justify-between items-center   pl-2  border-none  w-full">
                        <Link href={elm.route} className="flex items-center w-full">
                            {elm.icon && <elm.icon className="mr-2" />}
                            {elm.name}
                        </Link>
                        {elm.childrens && elm.childrens.length > 0 && (
                             <div
                                 onClick={() => toggleChildren(elm.route)}
                                 className="ml-2 text-sm text-blue-500 "
                             >
                                 {openRoutes[elm.route] ? <HiChevronUp /> : <HiChevronDown />}
                             </div>
                        )}
                    </div>
                </ListGroup.Item>
                {elm.childrens && elm.childrens.length > 0 && openRoutes[elm.route] && (
                    <ListGroup>
                        {renderRoutes(elm.childrens)}
                    </ListGroup>
                )}
            </ListGroup>
        ));
    };

    return (
        <div className="row-span-7">
            <ListGroup className="mx-5 ">
                {renderRoutes(routes.getRoutes())}
            </ListGroup>
        </div>
    );
}
