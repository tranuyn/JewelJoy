import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import CachedIcon from "@mui/icons-material/Cached";

const StaffSection = () => {
  return (
    <div
      className="customerContainerBig"
      style={{ backgroundColor: "#FFFBE9", marginTop: "10px" }}
    >
      <div className="customerContainer">
        <PersonOutlineIcon sx={{ color: "#EFB26A", marginRight: "10px" }} />
        <div>
          <div className="BoldText">Thông tin nhân viên</div>
          <div className="cflexrow" style={{ alignItems: "center" }}>
            <div style={{ marginRight: "100px" }}>
              <div className="catchPhone">
                <div>Email:</div>
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
      <button className="viewButton">Xem hồ sơ nhân viên</button>
    </div>
  );
};

export default StaffSection;
