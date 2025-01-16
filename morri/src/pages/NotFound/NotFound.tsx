import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import { useAuth } from "../../services/useAuth";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, validateAuthStatus } = useAuth();

  const handleGoHome = () => {
    if (
      user?.role === "ADMIN" ||
      user?.role === "INVENTORY_STAFF" ||
      user?.role === "SALE_STAFF"
    ) {
      navigate("/home");
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Oops! Trang bạn đang tìm không tồn tại.
      </p>
      <BtnComponent
        btnColorType="close"
        btnText="Về trang chủ"
        onClick={() => handleGoHome()}
      />
    </div>
  );
};

export default NotFound;
