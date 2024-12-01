import { Explore, Menu, Place } from "@mui/icons-material";
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Admin(params) {
  useEffect(() => {
    document.title = "Backstage management"
  }, [])
  const [isSideOpen, setIsSideOpen] = useState(false);

  function handleSideToggle() {
    setIsSideOpen(!isSideOpen);
  }

  const links = [
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
          <Link to="/login" className="nav-link">Log Out</Link>
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
              links.map((l, i) => (
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
          <Outlet />
        </Box>
      </Stack>
    </>
  )
};
