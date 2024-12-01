import { PersonOutline, ReceiptLongOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Profile(params) {
  useEffect(() => {
    document.title = "Profile";
  }, [])
  const data = {
    fname: "Samat",
    lname: "Bekturganov",
    email: "account@mail.com",
    phone: "87776543210"
  }

  return (
    <div className="profile-page">
      <div className="profile-side">
        <div className="profile">
          <Avatar 
            // src={}
            sx={{ width: 60, height: 60}}
          />
          <div className="user-name">
            {`${data.fname} ${data.lname}`}
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
        <Outlet context={data} />
      </div>
    </div>
  ) 
}
