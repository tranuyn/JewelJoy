import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorization.css";
import BtnComponent from "../../component/BtnComponent/BtnComponent";

const Unauthorization: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">401</h1>
      <p className="not-found-message">
        Oops! Bạn không có quyền truy cập vào đây.
      </p>
      <BtnComponent
        btnColorType="close"
        btnText="Về trang chủ"
        onClick={() => handleGoHome()}
      />
    </div>
  );
};

export default Unauthorization;
