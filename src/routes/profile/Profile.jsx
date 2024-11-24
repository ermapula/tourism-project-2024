import { PersonOutline, ReceiptLongOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Profile(params) {
  return (
    <div className="profile-page">
      <div className="profile-side">
        <div className="profile">
          <Avatar 
            // src={}
            sx={{ width: 60, height: 60}}
          />
          <div className="user-name">
            Firstname Lastname
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
        <Outlet />
      </div>
    </div>
  ) 
}
