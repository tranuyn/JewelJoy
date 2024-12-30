import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import CachedIcon from "@mui/icons-material/Cached";
interface StaffSectionProps {
  setStaffInfo: React.Dispatch<React.SetStateAction<any>>;
}
const StaffSection: React.FC<StaffSectionProps> = ({ setStaffInfo }) => {
  const [email, setEmail] = useState<string>("");
  const [staffInfo, setLocalStaffInfo] = useState<any>({});

  const handleReloadClick = () => {
    if (email) {
      fetchStaffInfo(email);
    }
  };

  const fetchStaffInfo = async (email: string) => {
    try {
      const response = await fetch(
        `http://localhost:8081/user/getUserByEmail/${email}`
      );
      if (!response.ok) {
        setLocalStaffInfo(null);
        throw new Error("Không thể lấy dữ liệu");
      }
      const data = await response.json();
      setStaffInfo(data);
      setLocalStaffInfo(data); // Cập nhật thông tin nhân viên
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
                <input
                  className="inputCheckout"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div
                  className="CachedIconContainer"
                  onClick={() => handleReloadClick()}
                >
                  <CachedIcon sx={{ color: "#08B5FA" }} />
                </div>
              </div>
              <p>
                Giới tính:{" "}
                {staffInfo?.gender === "MALE"
                  ? "Nam"
                  : staffInfo?.gender === "FEMALE"
                  ? "Nữ"
                  : "Không có dữ liệu"}
              </p>
            </div>
            <div>
              <p>Họ và tên: {staffInfo?.name || "Không có dữ liệu"}</p>
              <p>CCCD/CMND: {staffInfo?.cccd || "Không có dữ liệu"}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="viewButton">Xem hồ sơ nhân viên</button>
    </div>
  );
};

export default StaffSection;
