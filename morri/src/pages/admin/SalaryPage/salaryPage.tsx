import React, { useState } from "react";
import "./salaryPage.css";
import { Box } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TableComponent from "../../../component/TableComponent/TableComponent";
import TextBox from "../../../component/TextBox/TextBox";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import Header from "../../../component/Title_header/Header";
import ThemLuongThang from "./ThemLuongThang";

interface Column {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "center" | "right";
}

const columns: Column[] = [
  { field: "staffName", headerName: "Tên nhân viên" },
  { field: "totalSalary", headerName: "Tổng lương" },
  { field: "totalThuong", headerName: "Tiền thưởng" },
  { field: "totalPhat", headerName: "Tiền phạt" },
  { field: "salaryDate", headerName: "Ngày nhận lương" },
  { field: "totalFlower", headerName: "Tiền hoa hồng" },
];

const data = [
  {
    staffName: "J97",
    totalSalary: 23939,
    totalThuong: 23939,
    totalPhat: 23939,
    salaryDate: "08/10/2024",
    totalFlower: 33838,
  },
  {
    staffName: "K98",
    totalSalary: 30000,
    totalThuong: 5000,
    totalPhat: 1000,
    salaryDate: "08/11/2024",
    totalFlower: 2000,
  },
];

const SalaryPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(data[0]);
  const [isModalThemLuongOpen, setModalThemLuongOpen] = useState(false);
  const handleAddSalary = async () => {};

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <Header title="Quản lý lương" />
      <div style={{ padding: "10px" }}></div>
      <div className="salary-container">
        <div className="left-column">
          <ul className="staff-list">
            {data.map((user, index) => (
              <li
                key={index}
                className="staff-item"
                onClick={() => handleUserClick(user)}
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt="Staff"
                  className="staff-img"
                />
                <div className="staff-info">
                  <p className="staff-name">{user.staffName}</p>
                  <p className="staff-role">Sale Staff</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="right-side">
          {/* Top Row */}

          <div className="top-row">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "30px",
                marginBottom: "20px",
              }}
            >
              <h3>Thống kê theo tháng</h3>
              <BtnComponent
                btnColorType="primary"
                btnText={"Thêm Lương Tháng"}
                onClick={() => {
                  setModalThemLuongOpen(true);
                }}
              />
            </div>
            <div className="stat-box">
              <Box sx={{ display: "flex", gap: 4 }}>
                <TextBox
                  datatype="number"
                  title="Số giờ làm việc thực tế"
                  placeholder={String(selectedUser.totalSalary)}
                  onChange={(value) => {}}
                  icon={<HourglassBottomIcon style={{ color: "black" }} />}
                />
                <TextBox
                  datatype="number"
                  title="Số ngày làm việc thực tế"
                  placeholder="30"
                  onChange={(value) => {}}
                  defaultValue={30}
                  icon={<CalendarTodayIcon style={{ color: "black" }} />}
                />
                <TextBox
                  datatype="number"
                  title="Số sản phẩm/ Số đơn"
                  placeholder="15"
                  defaultValue={30}
                  onChange={(value) => {}}
                  icon={<Inventory2Icon style={{ color: "black" }} />}
                />
              </Box>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="bottom-row">
            <h3>Lương theo tháng</h3>
            <TableComponent
              columns={columns}
              data={[selectedUser]}
              onRowClick={(row) => console.log("Row clicked:", row)}
              onEdit={(row) => console.log("Edit:", row)}
              onDelete={(row) => console.log("Delete:", row)}
            />
            <ThemLuongThang
              isModalOpen={isModalThemLuongOpen}
              setIsModalOpen={setModalThemLuongOpen}
              handleAddSalary={handleAddSalary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
