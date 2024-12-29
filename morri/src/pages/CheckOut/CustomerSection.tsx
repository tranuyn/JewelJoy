import React, { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import CachedIcon from "@mui/icons-material/Cached";

const CustomerSection = () => {
  return (
    <div className="customerContainerBig">
      <div className="customerContainer">
        <PersonOutlineIcon sx={{ color: "#EFB26A", marginRight: "10px" }} />
        <div>
          <div className="BoldText">Thông tin khách hàng</div>
          <div className="cflexrow" style={{ alignItems: "center" }}>
            <div style={{ marginRight: "100px" }}>
              <div className="catchPhone">
                <div>Số điện thoại:</div>
                <input className="inputCheckout" />
                <div className="CachedIconContainer">
                  <CachedIcon sx={{ color: "#08B5FA" }} />{" "}
                </div>
              </div>
              <p>Giới tính:</p>
            </div>
            <div>
              <p>Họ và tên: Hồ Kim Thiên Nga</p>
              <p>CCCD/CMND:</p>
            </div>
          </div>
        </div>
      </div>
      <button className="viewButton">Xem hồ sơ khách hàng</button>
    </div>
  );
};

export default CustomerSection;
