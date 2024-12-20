import React, { useState } from "react";
import Header from "../../../component/Title_header/Header";
import TableComponent from "../../../component/TableComponent/TableComponent";
import { Box } from "@mui/material";
import TabBar from "../../../component/Tabbar/TabBar";
interface Column {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "center" | "right";
}
const columns: Column[] = [
  { field: "transactionId", headerName: "Mã giao dịch" },
  { field: "paymentType", headerName: "Trả bằng" },
  { field: "date", headerName: "Ngày trả" },
  { field: "quantity", headerName: "Số lượng" },
  { field: "customerName", headerName: "Tên khách hàng" },
  { field: "totalAmount", headerName: "Tổng tiền" },
  { field: "paymentDate", headerName: "Ngày trả" },
];

const data = [
  {
    transactionId: "1234324",
    paymentType: "Thẻ",
    date: "08/10/2024",
    quantity: 2,
    customerName: "Dinh noc kich tran",
    totalAmount: "1.200.00đ",
    paymentDate: "08/10/2024",
  },
];
const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Hôm nay");

  const tabs = ["Hôm nay", "Tuần này", "Tháng này", "Năm này"];
  return (
    <div className="history-container">
      <Header title="Lịch sử giao dịch" />
      <div style={{ padding: "10px" }}></div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TabBar
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultTab="Hôm nay"
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

export default HistoryPage;
