import React from "react";
import { Route } from "react-router-dom";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../component/Layout/AdminLayout";
import HomePage from "../pages/HomePage/homePage";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";

export const StaffRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={[ROLES.STAFF]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<HomePage />} />

      <Route path="/products" element={<ProductsAndService />} />
    </Route>
  );
};
