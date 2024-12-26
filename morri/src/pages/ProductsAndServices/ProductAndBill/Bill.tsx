import React from "react";
import "./style.css";

const Bill: React.FC = () => {
  return (
    <div className="billContainer">
      <div>Hóa đơn mua hàng</div>
      <div>
        <div>Tổng</div>
        <div>100.000 VND</div>
      </div>

      <button>Mua ngay</button>
    </div>
  );
};

export default Bill;
