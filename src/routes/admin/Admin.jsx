import { Bookmark, Explore, Menu, Person, Place, ReceiptLongOutlined } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Admin(params) {
  const [mode, setMode] = useState(0);
  const {user, setUser} = useContext(AuthContext);
  const nav = useNavigate()
  useEffect(() => {
    document.title = "Backstage management"
  }, [])
  useEffect(() => {
    if(user?.role == 'admin') {
      setMode(1)
    } else if (user?.role == 'manager') {
      setMode(2)
    } else {
      nav('/')
    }
  }, [])
  const [isSideOpen, setIsSideOpen] = useState(false);

  function handleSideToggle() {
    setIsSideOpen(!isSideOpen);
  }

  const managerLinks = [
    { 
      text: "Locations",
      path: "/admin/locations",
      icon: <Place />,
    },
    { 
      text: "Tours",
      path: "/admin/tours",
      icon: <Explore />,
    },
  ]

  const adminLinks = [
    { 
      text: "Categories",
      path: "/admin/categories",
      icon: <Bookmark />,
    },
    { 
      text: "Locations",
      path: "/admin/locations",
      icon: <Place />,
    },
    {
      text: "Users",
      path: "/admin/users",
      icon: <Person />,
    },
  ]
  
  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }

  return (
    <>
      <nav className="nav admin-nav">
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={handleSideToggle}
            sx={{
              position: "absolute",
              color: "white",
              left: 20,
            }}
          >
            <Menu />
          </IconButton>
        <div className="nav-left">
          <Link to='/' className="nav-link">Site Home page</Link>
        </div>
        <div className="nav-right">
          {
            user ?
            (<a href="/" onClick={handleLogout} className="nav-link">Log Out</a>)
            : 
            (<Link to="/login" className="nav-link">Log In</Link>)
          }
        </div>
      </nav>

      <Stack
        direction="row"
        mt="48px"
        sx={{minHeight: "calc(100vh - 48px)"}}
      >
        <Box 
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            borderRight: "1px solid rgba(0, 0, 0, 0.25)",
            width: isSideOpen ? "250px" : "60px",
            transition: "width 100ms",
          }}
        >
          <List>
            {
              mode == 1 &&
              adminLinks.map((l, i) => (
                <ListItem key={i} sx={{padding: 0}} >
                  <ListItemButton
                    component={Link}
                    to={l.path}
                    sx={{height: "48px"}}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        marginRight: isSideOpen ? 2 : 0,
                        minWidth: 0,
                      }}
                    >
                      {l.icon}
                    </ListItemIcon>
                    {isSideOpen && <ListItemText primary={l.text} />}
                  </ListItemButton>
                </ListItem>
              ))
            }
            {
              mode == 2 &&
              managerLinks.map((l, i) => (
                <ListItem key={i} sx={{padding: 0}} >
                  <ListItemButton
                    component={Link}
                    to={l.path}
                    sx={{height: "48px"}}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        marginRight: isSideOpen ? 2 : 0,
                        minWidth: 0,
                      }}
                    >
                      {l.icon}
                    </ListItemIcon>
                    {isSideOpen && <ListItemText primary={l.text} />}
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
        <Box
          sx={{
            p: 2,
            width: "100%"
          }}
        >
          <Outlet context={{permission: mode}} />
        </Box>
      </Stack>
    </>
  )
};
