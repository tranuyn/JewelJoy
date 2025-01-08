import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import AdminLayout from "../component/Layout/AdminLayout";
import { ROLES } from "../constants/roles";
import HomePage from "../pages/HomePage/homePage";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import RepurchasePage from "../pages/RepurchasePage/RepurchasePage";

import Unauthorization from "../pages/Unauthorization/Unauthorization";
import { ProtectedRoute } from "./ProtectedRoute";
import EnterInventory from "../pages/EnterInventory/EnterInventory";
import AttendancePage from "../pages/AttendancePage/AttendancePage";
import StaffPage from "../pages/StaffPage/StaffPage";
import SettingPage from "../pages/SettingPage/SettingPage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import OrdersPage from "../pages/OrdersPage/ordersPage";
import ViewOrEdit from "../pages/EnterInventory/ViewOrEdit/ViewOrEdit";
import Inventory from "../pages/InventoryPage/Inventory";
import EmployeeHomePage from "../pages/HomePage/EmployeeHomePage";
import { useAuth } from "../services/useAuth";
export const InventoryStaffRoutes = () => {
  const { isAuthenticated, user, validateAuthStatus } = useAuth();

  useEffect(() => {
    validateAuthStatus();
  }, [validateAuthStatus]);
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={[ROLES.INVENTORY_STAFF]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="/home" element={user?.role === "ADMIN" ? <HomePage /> : <EmployeeHomePage />} /> */}
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/settings" element={<SettingPage />} />

      <Route path="/products" element={<ProductsAndService />} />
      <Route path="/products/detail/:id" element={<ProductDetail />} />
      <Route path="/enter-inventory" element={<EnterInventory />} />
      <Route path="/enter-inventory/:id" element={<ViewOrEdit />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/unauthorized" element={<Unauthorization />} />
      <Route path="/repurchase" element={<RepurchasePage />} />
      <Route path="/inventory" element={<Inventory />} />

      <Route path="*" element={<Navigate to="/unauthorized" />} />
    </Route>
  );
};
