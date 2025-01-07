import React, { useState, useEffect } from "react";
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

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  avaURL: string | null;
  luongCoBan: string | null;
}

interface SalaryData {
  staffName: string;
  totalSalary: number;
  totalThuong: number;
  totalPhat: number;
  salaryDate: string;
  totalFlower: number;
}

const columns = [
  { field: "staffName", headerName: "Tên nhân viên" },
  { field: "totalSalary", headerName: "Tổng lương" },
  { field: "totalThuong", headerName: "Tiền thưởng" },
  { field: "totalPhat", headerName: "Tiền phạt" },
  { field: "salaryDate", headerName: "Ngày nhận lương" },
  { field: "totalFlower", headerName: "Tiền hoa hồng" },
];

const SalaryPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<SalaryData | null>(null);
  const [isModalThemLuongOpen, setModalThemLuongOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/");
      const data = await response.json();
      setUsers(data);

      if (data.length > 0) {
        const initialSalaryData: SalaryData = {
          staffName: data[0].name,
          totalSalary: Number(data[0].luongCoBan) || 0,
          totalThuong: 0,
          totalPhat: 0,
          salaryDate: new Date().toLocaleDateString(),
          totalFlower: 0,
        };
        setSelectedUser(initialSalaryData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = (user: User) => {
    const salaryData: SalaryData = {
      staffName: user.name,
      totalSalary: Number(user.luongCoBan) || 0,
      totalThuong: 0,
      totalPhat: 0,
      salaryDate: new Date().toLocaleDateString(),
      totalFlower: 0,
    };
    setSelectedUser(salaryData);
  };

  const handleAddSalary = async () => {
    // Implement salary addition logic here
    setModalThemLuongOpen(false);
  };

  return (
    <div>
      <Header title="Quản lý lương" />
      <div style={{ padding: "10px" }}></div>
      <div className="salary-container">
        <div className="left-column">
          <ul className="staff-list">
            {users.map((user) => (
              <li
                key={user.id}
                className="staff-item"
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={user.avaURL || "https://via.placeholder.com/50"}
                  alt="Staff"
                  className="staff-img"
                />
                <div className="staff-info">
                  <p className="staff-name">{user.name}</p>
                  <p className="staff-role">{user.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="right-side">
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
                btnText="Thêm Lương Tháng"
                onClick={() => setModalThemLuongOpen(true)}
              />
            </div>
            <div className="stat-box">
              <Box sx={{ display: "flex", gap: 4 }}>
                <TextBox
                  datatype="number"
                  title="Số giờ làm việc thực tế"
                  placeholder={selectedUser?.totalSalary.toString() || "0"}
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

          <div className="bottom-row">
            <h3>Lương theo tháng</h3>
            {selectedUser && (
              <TableComponent
                columns={columns}
                data={[selectedUser]}
                onRowClick={(row) => console.log("Row clicked:", row)}
                onEdit={(row) => console.log("Edit:", row)}
                onDelete={(row) => console.log("Delete:", row)}
              />
            )}
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
