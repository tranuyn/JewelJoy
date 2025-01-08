import React from "react";
import { Navigate, Route } from "react-router-dom";
import AdminLayout from "../component/Layout/AdminLayout";
import { ROLES } from "../constants/roles";
import CustomerMangementPage from "../pages/admin/CustomerMangementPage/CustomerManagementPage";
import HistoryPage from "../pages/admin/HistoryPage/HistoryPage";
import SalaryPage from "../pages/admin/SalaryPage/salaryPage";
import AttendancePage from "../pages/AttendancePage/AttendancePage";
import CheckOut from "../pages/CheckOut/CheckOut";
import CheckOutSuccess from "../pages/CheckOut/CheckOutSuccess";
import HomePage from "../pages/HomePage/homePage";
import Inventory from "../pages/InventoryPage/Inventory";
import OrdersPage from "../pages/OrdersPage/ordersPage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import RepurchasePage from "../pages/RepurchasePage/RepurchasePage";
import ServicePage from "../pages/ServicePage/ServicePage";
import SettingPage from "../pages/SettingPage/SettingPage";
import StaffPage from "../pages/StaffPage/StaffPage";
import Statistics from "../pages/StatisticsPage/Statistics";
import Unauthorization from "../pages/Unauthorization/Unauthorization";
import { ProtectedRoute } from "./ProtectedRoute";

import EnterInventory from "../pages/EnterInventory/EnterInventory";
import ViewOrEdit from "../pages/EnterInventory/ViewOrEdit/ViewOrEdit";

export const AdminRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      {/* <Route path="/home" element={<HomePage />} /> */}
      <Route path="/home" element={<EmployeeHomePage />} />
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
      <Route path="/enter-inventory/:id" element={<ViewOrEdit />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/unauthorized" element={<Unauthorization />} />
      <Route path="*" element={<Navigate to="/unauthorized" />} />

      <Route path="/repurchase" element={<RepurchasePage />} />
    </Route>
  );
};
