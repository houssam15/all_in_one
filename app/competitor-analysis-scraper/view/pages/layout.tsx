import React from "react";
import Navbar  from "../components/navbar";
import Main  from "../components/main";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Navbar/>
        <Main children={children}/>
      </section>
    )
  }