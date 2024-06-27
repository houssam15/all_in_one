"use client"
import React, { useState } from "react";
import {Header , AddWebsite , WebsiteList  , WebsiteAnalytics , Footer, PagesList} from "../components";
export default function Home() {
    return (
      <div className="bg-white font-mono">
          <Header/>
          <AddWebsite/>
          <WebsiteList />
          <PagesList />
          {/* <WebsiteAnalytics/> */}
          {/* <Footer/> */}
      </div>
    );
}