import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout(params) {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    localStorage.getItem("logged") !== null ? 
      setLogged(true) : 
      setLogged(false);
  }, [])

  return (
    <>
      <Header logged={logged} />
      <div style={{marginTop: "48px"}}>
        <Outlet />
      </div>
      <Footer />
    </>
  ) 
}