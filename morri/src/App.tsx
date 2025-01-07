import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ROLES } from "./constants/roles";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Unauthorization from "./pages/Unauthorization/Unauthorization";
import { AdminRoutes } from "./routes/AdminRoutes";
import { CustomerRoutes } from "./routes/CustomerRoutes";
import { InventoryStaffRoutes } from "./routes/InventoryStaffRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { SalesStaffRoutes } from "./routes/SalesStaffRoutes";
import { useAuth } from "./services/useAuth";

function App() {
  const { isAuthenticated, user, validateAuthStatus } = useAuth();

  useEffect(() => {
    validateAuthStatus();
  }, [validateAuthStatus]);

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          {PublicRoutes()}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }
  console.log("user", user);

  return (
    <BrowserRouter>
      <Routes>
        {user?.role === "ADMIN" && AdminRoutes()}
        {user?.role === "SALE_STAFF" && SalesStaffRoutes()}
        {user?.role === "INVENTORY_STAFF" && InventoryStaffRoutes()}
        {user?.role === ROLES.CUSTOMER && CustomerRoutes()}
        <Route path="/unauthorized" element={<Unauthorization />} />
        <Route path="*" element={<Navigate to="/unauthorized" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
