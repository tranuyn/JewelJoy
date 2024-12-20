import React from "react";
import { Route } from "react-router-dom";
import Login from "../pages/LoginPage/LoginPage";
import Register from "../pages/SignUp/SignUpPage";
import NotFound from "../pages/NotFound/NotFound";

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};
