import React from "react";
import {Header , AddWebsite , WebsiteList , Pages , WebsiteAnalytics , Footer} from "../components";
export default function Home() {
    return (
      <div className="bg-white">
          <Header/>
          <AddWebsite/>
          <WebsiteList/>
          <Pages/>
          <WebsiteAnalytics/>
          <Footer/>
      </div>
    );
}