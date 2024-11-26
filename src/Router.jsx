import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Layout from "./components/Layout";
import Location from "./routes/Location";
import Tour from "./routes/Tour";
import Profile from "./routes/profile/Profile";
import Personal from "./routes/profile/Personal";
import Orders from "./routes/profile/Orders";
import Admin from "./routes/admin/Admin";
import LocationsAdmin from "./routes/admin/LocationsAdmin";
import ToursAdmin from "./routes/admin/ToursAdmin";



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
      {
        path: "profile",
        element: <Profile />,
        children: [
          { 
            index: true,
            element: <Personal />
          },
          { 
            path: "personal",
            element: <Personal />
          },
          { 
            path: "orders",
            element: <Orders />
          },
        ]
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
  {
    path: "admin",
    element: <Admin />,
    children: [
      { 
        index: true,
        element: <LocationsAdmin />
      },
      { 
        path: "locations",
        element: <LocationsAdmin />
      },
      { 
        path: "tours",
        element: <ToursAdmin />
      },
    ]
  },
])

export default router;