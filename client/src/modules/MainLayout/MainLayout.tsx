import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component={"nav"} sx={{ width: 250, flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - 250px)` } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
