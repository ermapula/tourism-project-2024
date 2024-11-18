import { cloneElement } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(params) {
  return (
    <>
      <Header />
      <div>
        {cloneElement(params.children)}
      </div>
      <Footer />
    </>
  ) 
}