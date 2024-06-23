import React from "react";
import { PagesList ,PagesFilter} from ".";

export default function Pages() {  
    return (
        <div className="w-full h-96 flex">
            <PagesFilter width={"w-1/4"}/>
            <PagesList width={"w-3/4"} /> 
        </div>
    );
}
  