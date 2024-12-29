import React from "react";
import { Navigate, Route } from "react-router-dom";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../component/Layout/AdminLayout";
import HomePage from "../pages/HomePage/homePage";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import Unauthorization from "../pages/Unauthorization/Unauthorization";
import CheckOut from "../pages/CheckOut/CheckOut";

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

      <Route path="/products" element={<ProductsAndService />} />
      <Route path="/products/checkout" element={<CheckOut />} />
      <Route path="/unauthorized" element={<Unauthorization />} />
      <Route path="*" element={<Navigate to="/unauthorized" />} />
    </Route>
  );
};
