import React from "react";
import { Routes, Route } from "react-router-dom";
import SalaryPage from "./pages/SalaryPage/salaryPage";
import DashboardLayout from "./component/Layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/home" element={<SalaryPage />} />
        <Route path="/salary" element={<SalaryPage />} />
        <Route path="/staff/" element={<SalaryPage />} />
        <Route path="/repurchase" element={<SalaryPage />} />
        <Route path="/hehe" element={<SalaryPage />} />
        <Route path="/products" element={<SalaryPage />} />
        <Route path="/history" element={<SalaryPage />} />
        <Route path="/customers" element={<SalaryPage />} />
        <Route path="/services" element={<SalaryPage />} />
        <Route path="/inventory" element={<SalaryPage />} />
        <Route path="/settings" element={<SalaryPage />} />
        <Route path="/statistics" element={<SalaryPage />} />
        <Route path="/attendance" element={<SalaryPage />} />
        <Route path="/orders" element={<SalaryPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
