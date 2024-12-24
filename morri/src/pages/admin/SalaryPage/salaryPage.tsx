import React, { useState } from "react";
import "./salaryPage.css";
import { Box } from "@mui/material";
import Header from "../../../component/Title_header/Header";
import TabBar from "../../../component/Tabbar/TabBar";
import TableComponent from "../../../component/TableComponent/TableComponent";
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
];

const SalaryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Khách hàng bán");

  const tabs = ["Khách hàng bán", "Khách hàng mua"];

  return (
    <div className="salary-container">
      <Header title="Quản lý lương" />
      <div style={{ padding: "10px" }}></div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TabBar
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultTab="Khách hàng bán"
          styleType="custom"
        />{" "}
      </Box>
      <div style={{ padding: "10px" }}></div>
      <TableComponent
        columns={columns}
        data={data}
        onRowClick={(row) => console.log("Row clicked:", row)}
        onEdit={(row) => console.log("Edit:", row)}
        onDelete={(row) => console.log("Delete:", row)}
      />
    </div>
  );
};

export default SalaryPage;
