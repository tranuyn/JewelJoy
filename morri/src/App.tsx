import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ROLES } from "./constants/roles";
import Unauthorization from "./pages/Unauthorization/Unauthorization";
import { AdminRoutes } from "./routes/AdminRoutes";
import { CustomerRoutes } from "./routes/CustomerRoutes";
import { InventoryStaffRoutes } from "./routes/InventoryStaffRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { SalesStaffRoutes } from "./routes/SalesStaffRoutes";
import { useAuth } from "./services/useAuth";

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    logout();
    return (
      <BrowserRouter>
        <Routes>
          {PublicRoutes()}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {user?.role === ROLES.ADMIN && AdminRoutes()}
        {user?.role === ROLES.SALE_STAFF && SalesStaffRoutes()}
        {user?.role === ROLES.INVENTORY_STAFF && InventoryStaffRoutes()}
        {user?.role === ROLES.CUSTOMER && CustomerRoutes()}
        <Route path="/unauthorized" element={<Unauthorization />} />
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
