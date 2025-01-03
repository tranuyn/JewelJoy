import React from "react";
import { Navigate, Route } from "react-router-dom";
import AdminLayout from "../component/Layout/AdminLayout";
import { ROLES } from "../constants/roles";
import AttendancePage from "../pages/AttendancePage/AttendancePage";
import CheckOut from "../pages/CheckOut/CheckOut";
import CheckOutSuccess from "../pages/CheckOut/CheckOutSuccess";
import HomePage from "../pages/HomePage/homePage";
import OrdersPage from "../pages/OrdersPage/ordersPage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import RepurchasePage from "../pages/RepurchasePage/RepurchasePage";
import SettingPage from "../pages/SettingPage/SettingPage";
import StaffPage from "../pages/StaffPage/StaffPage";
import Unauthorization from "../pages/Unauthorization/Unauthorization";
import { ProtectedRoute } from "./ProtectedRoute";

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
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/products/detail/:id" element={<ProductDetail />} />
      <Route path="/products" element={<ProductsAndService />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products/checkout" element={<CheckOut />} />
      <Route path="/products/checkout/:orderId" element={<CheckOutSuccess />} />
      <Route path="/unauthorized" element={<Unauthorization />} />
      <Route path="/repurchase" element={<RepurchasePage />} />

      <Route path="*" element={<Navigate to="/unauthorized" />} />
    </Route>
  );
};
