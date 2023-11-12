import React from "react";
import { Drawer, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
      }}
      open
    >
      <List>
        <ListItem>
          <Link to={"/"}>Dashboard</Link>
        </ListItem>
        <ListItem>
          <Link to={"/warehouse"}>Warehouse</Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
