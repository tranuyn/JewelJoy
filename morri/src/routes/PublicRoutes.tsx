import React from "react";
import { Navigate, Route } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import {
  default as Register,
  default as Registration,
} from "../pages/SignUp/SignUpPage";
import Forgotpassword from "../pages/ForgotPassword/Forgotpassword";
import Login from "../pages/LoginPage/LoginPage";
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

      <Route path="/registeration" element={<Registration />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </>
  );
};
