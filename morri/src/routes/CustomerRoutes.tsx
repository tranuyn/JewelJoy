import React from "react";
import { Route } from "react-router-dom";
import CustomerLayout from "../component/Layout/CustomerLayout";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";

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
