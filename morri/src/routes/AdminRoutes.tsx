import React from "react";
import { Navigate, Route } from "react-router-dom";
import AdminLayout from "../component/Layout/AdminLayout";
import { ROLES } from "../constants/roles";
import CustomerMangementPage from "../pages/admin/CustomerMangementPage/CustomerManagementPage";
import HistoryPage from "../pages/admin/HistoryPage/HistoryPage";
import SalaryPage from "../pages/admin/SalaryPage/salaryPage";
import AttendancePage from "../pages/AttendancePage/AttendancePage";
import HomePage from "../pages/HomePage/homePage";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import Unauthorization from "../pages/Unauthorization/Unauthorization";
import { ProtectedRoute } from "./ProtectedRoute";

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
      <Route path="/attendance" element={<AttendancePage />} />

      <Route path="/unauthorized" element={<Unauthorization />} />
      <Route path="*" element={<Navigate to="/unauthorized" />} />
    </Route>
  );
};
