import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout(params) {
  return (
    <>
      <Header />
      <div style={{marginTop: "48px"}}>
        <Outlet />
      </div>
      <Footer />
    </>
  ) 
}