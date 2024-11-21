import { cloneElement } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(params) {
  return (
    <>
      <Header />
      <div style={{marginTop: "48px"}}>
        {cloneElement(params.children)}
      </div>
      <Footer />
    </>
  ) 
}