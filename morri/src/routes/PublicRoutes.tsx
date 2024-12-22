import React from "react";
import { Route } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword/Forgotpassword";
import NotFound from "../pages/NotFound/NotFound";
import {
  default as Register,
  default as Registration,
} from "../pages/SignUp/SignUpPage";
import Forgotpassword from "../pages/ForgotPassword/Forgotpassword";

export const PublicRoutes = () => {
  return (
    <>
       <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
 
      <Route path="/registeration" element={<Registration/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
 
      <Route path="*" element={<NotFound />} />
    </>
  );
};
