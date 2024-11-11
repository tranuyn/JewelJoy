import React from "react";
import "./salaryPage.css";

const SalaryPage: React.FC = () => {
  return (
    <div className="salary-page">
      <h1>Quản lý lương</h1>
      <div className="salary-content">
        {/* Add your salary management content here */}
        <div className="salary-card">
          <h2>Tổng quan</h2>
          <div className="salary-stats">
            <div className="stat-item">
              <span>Tổng nhân viên</span>
              <strong>25</strong>
            </div>
            <div className="stat-item">
              <span>Tổng lương tháng</span>
              <strong>150,000,000 VNĐ</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
