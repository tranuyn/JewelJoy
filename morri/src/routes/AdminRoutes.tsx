import React from "react";
import { Navigate, Route } from "react-router-dom";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../component/Layout/AdminLayout";
import CustomerMangementPage from "../pages/admin/CustomerMangementPage/CustomerManagementPage";
import SalaryPage from "../pages/admin/SalaryPage/salaryPage";
import HistoryPage from "../pages/admin/HistoryPage/HistoryPage";
import HomePage from "../pages/HomePage/homePage";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import Unauthorization from "../pages/Unauthorization/Unauthorization";
import OrdersPage from "../pages/OrdersPage/ordersPage";
import Inventory from "../pages/InventoryPage/Inventory";
import Statistics from "../pages/StatisticsPage/Statistics";

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
      <Route path="/admin/statistics" element={<Statistics />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="inventory" element={<Inventory />} />


      <Route path="/unauthorized" element={<Unauthorization />} />
      <Route path="*" element={<Navigate to="/unauthorized" />} />
    </Route>
  );
};
