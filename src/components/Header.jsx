import { Link } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Header(params) {
  
  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <Link to='/' className="nav-link">Home</Link>
          <Link to='/profile' className="nav-link">Profile</Link>
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
            params.logged ?
            (<a href="/" onClick={() => {localStorage.removeItem("logged")}} className="nav-link">Log Out</a>)
            : 
            (<Link to="/login" className="nav-link">Log In</Link>)
          }
        </div>
      </nav>
    </>
  )
}
