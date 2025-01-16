import React, { useEffect } from "react";
import { useAuth } from "../../services/useAuth";
import HomePage from "./homePage";
import EmployeeHomePage from "./EmployeeHomePage";

const RoutingHomePage: React.FC = () => {
  const { isAuthenticated, user, validateAuthStatus } = useAuth();

  useEffect(() => {
    validateAuthStatus();
  }, [validateAuthStatus]);
  return user?.role === "ADMIN" ? <HomePage/> : <EmployeeHomePage/> ;
}

export default RoutingHomePage;