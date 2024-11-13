import { Link } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Header(params) {
  
  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <Link to='/' className="nav-link">Home</Link>
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
          <Link to="/login" className="nav-link">Log In</Link>
        </div>
      </nav>
    </>
  )
}
