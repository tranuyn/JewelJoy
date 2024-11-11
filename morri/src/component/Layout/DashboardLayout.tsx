import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import "./DashboardLayout.css";
import { Box } from "@mui/material";

const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
        <Dashboard onToggle={handleSidebarToggle} />
      </div>
      <Box
        className="main-content"
        sx={{
          marginLeft: isCollapsed ? "64px" : "250px",
          width: `calc(100% - ${isCollapsed ? "64px" : "250px"})`,
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default DashboardLayout;
