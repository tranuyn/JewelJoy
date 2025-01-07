import React from "react";
import { Route } from "react-router-dom";
import CustomerLayout from "../component/Layout/CustomerLayout";
import { ROLES } from "../constants/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navbar } from "../component/Navbar/Navbar";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductsAndService from "../pages/ProductsAndServices/productsAndServicePage";
import CheckOut from "../pages/CheckOut/CheckOut";
import CheckOutSuccess from "../pages/CheckOut/CheckOutSuccess";
import CartPage from "../pages/CartPage/CartPage";

export const CustomerRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
          <CustomerLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/products" element={<ProductsAndService />} />
      <Route path="/products/detail/:id" element={<ProductDetail />} />
      <Route path="/products/checkout" element={<CheckOut />} />
      <Route path="/products/checkout/:orderId" element={<CheckOutSuccess />} />
      <Route path="/cartpage" element={<CartPage />} />
    </Route>
  );
};
