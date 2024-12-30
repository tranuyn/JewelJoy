import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import "./CustomerLayout.css";

const CustomerLayout: React.FC = () => {
  return (
    <div className="customer-layout">
      <Navbar />
      <main className="customer-content">
        {/* <Outlet /> */}
      </main>
    </div>
  );
};

export default CustomerLayout;