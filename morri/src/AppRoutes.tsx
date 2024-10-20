import React from "react";
import { Routes, Route } from "react-router-dom";
import SalaryPage from "./pages/SalaryPage/salaryPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/salary" element={<SalaryPage />} />
    </Routes>
  );
};

export default AppRoutes;
