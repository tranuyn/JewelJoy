import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorization.css";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import { useAuth } from "../../services/useAuth";
import { Box } from "@mui/material";

const Unauthorization: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleGoHome = () => {
    navigate("/home");
  };
  const handleGoLogin = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">401</h1>
      <p className="not-found-message">
        Oops! Bạn không có quyền truy cập vào đây.
      </p>
      <Box sx={{ display: "flex", gap: 2 }}>
        <BtnComponent
          btnColorType="close"
          btnText="Về trang chủ"
          onClick={() => handleGoHome()}
        />
        <BtnComponent
          btnColorType="primary"
          btnText="Về login"
          onClick={() => handleGoLogin()}
        />
      </Box>
    </div>
  );
};

export default Unauthorization;
