import React from "react";
import { Route } from "react-router-dom";
import CartPage from "../pages/CartPage/CartPage";
import Forgotpassword from "../pages/ForgotPassword/Forgotpassword";
import Login from "../pages/LoginPage/LoginPage";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import {
  default as Register,
  default as Registration,
} from "../pages/SignUp/SignUpPage";
// import { useAuth } from "../services/useAuth";

export const PublicRoutes = () => {
  // const { isAuthenticated } = useAuth();

  // console.log("public route", isAuthenticated);
  // if (!isAuthenticated) {
  //   <Route path="*" element={<Navigate to="/login" replace />} />;
  // }

  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password/*" element={<ResetPassword />} />

      <Route path="/registeration" element={<Registration />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/cartpage" element={<CartPage />} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </>
  );
};
