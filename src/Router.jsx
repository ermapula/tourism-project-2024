import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Layout from "./components/Layout";
import Location from "./routes/Location";
import Tour from "./routes/Tour";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "",
        element: <Home />
      },
      {
        path: "locations/:id",
        element: <Location />
      },
      {
        path: "tours/:id",
        element: <Tour />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])

export default router;