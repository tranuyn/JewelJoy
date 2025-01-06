import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./component/Layout/DashboardLayout";
import HomePage from "./pages/HomePage/homePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OrdersPage from "./pages/OrdersPage/ordersPage";
import CustomerManagementPage from "./pages/admin/CustomerMangementPage/CustomerManagementPage";
import HistoryPage from "./pages/admin/HistoryPage/HistoryPage";
import ProductsAndService from "./pages/ProductsAndServices/productsAndServicePage";
import SalaryPage from "./pages/admin/SalaryPage/salaryPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import CheckOutSuccess from "./pages/CheckOut/CheckOutSuccess";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import EnterInventory from "./pages/EnterInventory/EnterInventory";
import ViewOrEdit from "./pages/EnterInventory/ViewOrEdit/ViewOrEdit";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/staff" element={<SalaryPage />} />
        <Route path="/repurchase" element={<SalaryPage />} />
        <Route path="/salary" element={<SalaryPage />} />
        <Route path="/products" element={<ProductsAndService />} />
        <Route path="/products/detail/:id" element={<ProductDetail />} />
        <Route path="/products/checkout" element={<CheckOut />} />
        <Route
          path="/products/checkout/:orderId"
          element={<CheckOutSuccess />}
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/customers" element={<CustomerManagementPage />} />
        <Route path="/services" element={<SalaryPage />} />
        <Route path="/inventory" element={<SalaryPage />} />
        <Route path="/enter-inventory" element={<EnterInventory />} />
        <Route path="/enter-inventory/:id" element={<ViewOrEdit />} />
        <Route path="/settings" element={<SalaryPage />} />
        <Route path="/statistics" element={<SalaryPage />} />
        <Route path="/attendance" element={<SalaryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
