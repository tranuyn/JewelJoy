import React from "react";
import { Route } from "react-router-dom";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../component/Layout/AdminLayout";
import CustomerMangementPage from "../pages/admin/CustomerMangementPage/CustomerManagementPage";
import SalaryPage from "../pages/admin/SalaryPage/salaryPage";
import HistoryPage from "../pages/admin/HistoryPage/HistoryPage";
import HomePage from "../pages/HomePage/homePage";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";

export const AdminRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductsAndService />} />

      <Route path="/admin/customer" element={<CustomerMangementPage />} />
      <Route path="/admin/salary" element={<SalaryPage />} />
      <Route path="/admin/history" element={<HistoryPage />} />
    </Route>
  );
};
