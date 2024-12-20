import React from "react";
import { Route } from "react-router-dom";
import Login from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import { default as Register, default as Registration } from "../pages/SignUp/SignUpPage";

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registeration" element={<Registration/>}/>
      <Route path="*" element={<NotFound />} />
    </>
  );
};
