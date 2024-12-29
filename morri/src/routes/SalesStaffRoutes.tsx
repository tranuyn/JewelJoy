import React from "react";
import { Route } from "react-router-dom";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../component/Layout/AdminLayout";
import HomePage from "../pages/HomePage/homePage";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import ServicePage from "../pages/ServicePage/ServicePage";
import CustomerManagementPage from "../pages/admin/CustomerMangementPage/CustomerManagementPage";
import SalaryPage from "../pages/admin/SalaryPage/salaryPage";

export const SalesStaffRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={[ROLES.SALE_STAFF]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<HomePage />} />
      <Route path="/service" element={<ServicePage />} /> 
      <Route path="/admin/customer" element={<CustomerManagementPage />} />
      <Route path="/products" element={<ProductsAndService />} /> 

    </Route>
  );
};
