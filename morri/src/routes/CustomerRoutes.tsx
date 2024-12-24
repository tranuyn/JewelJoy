import React from "react";
import { Route } from "react-router-dom";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import CustomerLayout from "../component/Layout/CustomerLayout";

export const CustomerRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
          <CustomerLayout />
        </ProtectedRoute>
      }
    >
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} /> */}
    </Route>
  );
};
