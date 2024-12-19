import { PersonOutline, ReceiptLongOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/auth";

export default function Profile(params) {
  const nav = useNavigate();
  const [data, setData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    document.title = "Profile";
  }, [])

  useEffect(() => {
    getProfile()
      .then((data) => {
        setData(data);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
      
  }, [])

  return (
    <div className="profile-page">
      <div className="profile-side">
        <div className="profile">
          <Avatar 
            // src={}
            sx={{ width: 60, height: 60}}
          />
          <div className="user-name">
            {`${data.first_name} ${data.last_name}`}
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
        <Outlet context={{data}} />
      </div>
    </div>
  ) 
}
