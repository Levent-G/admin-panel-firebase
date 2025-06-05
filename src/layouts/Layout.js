// src/layouts/Layout.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";

const drawerWidth = 240;

function Layout({ children }) {
  const isMobile = useMediaQuery("(max-width:800px)");
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <HomeIcon />, path: "/ana-sayfa" },
    { label: "Users", icon: <PeopleIcon />, path: "/kullanicilar" },
    { label: "Yeni Sayfa Ekle", icon: <AddIcon />, path: "/sayfa-olustur" },
    { label: "Sayfalarım", icon: <ViewListIcon />, path: "/sayfalarim" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <CssBaseline />

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f4f6f8",
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: "8px",
                  margin: "8px",
                  backgroundColor:
                    location.pathname === item.path ? "#e3f2fd" : "transparent",
                  color: "#1e1e2f",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 35, color: "#1976d2" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!isMobile && (
          <AppBar position="static" sx={{ backgroundColor: "#1e1e2f" }}>
            <Toolbar sx={{ fontWeight: 600, fontSize: "18px" }}>
              Admin Panel
            </Toolbar>
          </AppBar>
        )}

        {isMobile && (
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            {menuItems.map((item) => (
              <Box
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  flex: 1,
                  textAlign: "center",
                  py: 1,
                  textDecoration: "none",
                  color: location.pathname === item.path ? "#1976d2" : "#555",
                  borderBottom:
                    location.pathname === item.path
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <Box>{item.icon}</Box>
                <Box sx={{ fontSize: "14px", mt: 0.5 }}>{item.label}</Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Sayfa içeriği */}
        <Box sx={{ padding: 3, flex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default Layout;
