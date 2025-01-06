import React from "react";
import { Navbar } from "../Navbar/Navbar";
import "./CustomerLayout.css";
import { Outlet } from "react-router-dom";
import ProductsAndService from "../../pages/ProductsAndServices/productsAndServicePage";
import ProductDetail from "../../pages/ProductDetail/ProductDetail";

const CustomerLayout: React.FC = () => {
  return (
    <div className="customer-layout">
      <Navbar />
      <main className="customer-content">
        {/* <Outlet /> */}
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
