import { Person, PersonOutline, ReceiptLongOutlined } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

export default function Profile(params) {
  return (
    <div className="profile-page">
      <div className="profile-side">
        <div className="profile">
          <div className="user-pfp">
            <Person sx={{fontSize: 40}} />
            {/* <img className="user-pfp" src="../locations/charyn.jpg" alt="" /> */}
          </div>
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
      <div>
        <Outlet />
      </div>
    </div>
  ) 
}
