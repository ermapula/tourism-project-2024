import { Link } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import { AuthContext } from "../routes/auth/AuthContext";

export default function Header(params) {
  const {user, setUser} = useContext(AuthContext);
  
  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <Link to='/' className="nav-link">Home</Link>
          <Link to={user ? `/profile` : `/login`} className="nav-link">Profile</Link>
          {
            (user?.role == 'admin' || user?.role == 'manager') &&
            
            <Link to='/admin' className="nav-link">Backstage management</Link>
          }
        </div>
        <div className="nav-right">
          <Paper
            component="form"
            sx={{ borderRadius: 20 }}
          >
            <IconButton aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search places..."
            />
          </Paper>
          {
            user ?
            (<a href="/" onClick={handleLogout} className="nav-link">Log Out</a>)
            : 
            (<Link to="/login" className="nav-link">Log In</Link>)
          }
        </div>
      </nav>
    </>
  )
}
