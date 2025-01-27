import { PersonOutline, ReceiptLongOutlined } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getProfile } from "../../api/auth";
import { AuthContext } from "../auth/AuthContext";

export default function Profile(params) {
  const [loading, setLoading] = useState(false)
  const nav = useNavigate();
  const {user} = useContext(AuthContext);
  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    document.title = "Profile";
  }, [])

  useEffect(() => {
    if(!user) {
      setLoading(true)
      getProfile()
        .then((data) => {
          setData(data);
          console.log(data)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false)
        })
      }
      else {
      setLoading(true)
      setData(user)
      setLoading(false)
    }
  }, [user])

  return (
    <div className="profile-page">
      <div className="profile-side">
        <div className="profile">
          <Avatar 
            // src={}
            sx={{ width: 60, height: 60}}
          />
          <div className="user-name">
            {
              loading ? 
              <CircularProgress />
              :
              `${data.firstName} ${data.lastName}`
            }
          </div>
        </div>
        <div className="profile-nav">
          <Link className="p-nav-link" to="personal">
            <PersonOutline fontSize="large" />
            Personal info
          </Link>
          <Link className="p-nav-link" to="orders">
            <ReceiptLongOutlined fontSize="large" />
            My orders
          </Link>
        </div>
      </div>
      <div className="profile-main">
        <Outlet context={{data, loading, setLoading}} />
      </div>
    </div>
  ) 
}
