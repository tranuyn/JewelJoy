import React from "react";
import { Outlet } from "react-router-dom";
import "./CustomerLayout.css";

const CustomerLayout: React.FC = () => {
  return (
    <div className="customer-layout">
      <nav className="customer-nav">
        <h1>Customer Layout</h1>
      </nav>
      <main className="customer-content">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
