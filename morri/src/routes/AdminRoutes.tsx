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
import AttendancePage from "../pages/AttendancePage/AttendancePage";
import ServicePage from "../pages/ServicePage/ServicePage";
import StaffPage from "../pages/StaffPage/StaffPage";
import SettingPage from "../pages/SettingPage/SettingPage";
import CheckOut from "../pages/CheckOut/CheckOut";
import CheckOutSuccess from "../pages/CheckOut/CheckOutSuccess";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import EnterInventory from "../pages/EnterInventory/EnterInventory";

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
      <Route path="/products/detail/:id" element={<ProductDetail />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/products/checkout" element={<CheckOut />} />
      <Route path="/products/checkout/:orderId" element={<CheckOutSuccess />} />
      <Route path="/admin/customer" element={<CustomerMangementPage />} />
      <Route path="/admin/salary" element={<SalaryPage />} />
      <Route path="/admin/history" element={<HistoryPage />} />
      <Route path="/admin/statistics" element={<Statistics />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="/enter-inventory" element={<EnterInventory />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/unauthorized" element={<Unauthorization />} />
      <Route path="*" element={<Navigate to="/unauthorized" />} />
    </Route>
  );
};
