import { Link } from "react-router-dom";

export default function Header(params) {
  
  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <Link to='/' className="nav-link nav-elem">Home</Link>
        </div>
        <div className="nav-right">
          <Link to="/login" className="nav-elem">Log In</Link>
        </div>
      </nav>
    </>
  )
}
