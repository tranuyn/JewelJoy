import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./component/Layout/DashboardLayout";
import HomePage from "./pages/HomePage/homePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OrdersPage from "./pages/OrdersPage/ordersPage";
import ProductsAndService from "./pages/ProductsAndServices/productsAndServicePage";
import SalaryPage from "./pages/SalaryPage/salaryPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/salary" element={<SalaryPage />} />
        <Route path="/staff/" element={<SalaryPage />} />
        <Route path="/repurchase" element={<SalaryPage />} />
        <Route path="/hehe" element={<SalaryPage />} />
        <Route path="/products" element={<ProductsAndService />} />
        <Route path="/history" element={<SalaryPage />} />
        <Route path="/customers" element={<SalaryPage />} />
        <Route path="/services" element={<SalaryPage />} />
        <Route path="/inventory" element={<SalaryPage />} />
        <Route path="/settings" element={<SalaryPage />} />
        <Route path="/statistics" element={<SalaryPage />} />
        <Route path="/attendance" element={<SalaryPage />} />
        <Route path="/orders" element={<OrdersPage />} />

      </Route>
      <Route path="/login" element={<LoginPage />} />

    </Routes>
  );
};

export default AppRoutes;
