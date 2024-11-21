import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Layout from "./components/Layout";
import Location from "./routes/Location";



const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <Layout>
        <Home />
      </Layout>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/locations/:id",
    element: 
      <Layout>
        <Location />
      </Layout>
  },
])

export default router;