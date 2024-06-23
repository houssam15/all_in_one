"use client"
import React, { useState } from "react";
import {Header , AddWebsite , WebsiteList , Pages , WebsiteAnalytics , Footer} from "../components";
export default function Home() {
    return (
      <div className="bg-white font-mono">
          <Header/>
          <AddWebsite/>
          <WebsiteList />
          <Pages />
          <WebsiteAnalytics/>
          <Footer/>
      </div>
    );
}