import React, { useState, useEffect } from "react";
import "./style.css";
interface InventoryTabProps {
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// interface Column {
//     id: "code" | "supplier-user" | "quantity" | "unit" | "description" | "price" | "import_date" | "options";
//     label: string;
//   }

// const columns: Column[] = [
//   { id: "code", label: "Mã phiếu" },
//   { id: "supplier-user", label: "Nhà cung cấp - Nhân viên" },
//   { id: "quantity", label: "Số lượng" },
//   { id: "unit", label: "Đơn vị" },
//   { id: "description", label: "Mô tả" },
//   { id: "price", label: "Giá" },
//   { id: "import_date", label: "Ngày nhập kho" },
//   { id: "options", label: "Options" },
// ];

const HistoryEI: React.FC<InventoryTabProps> = ({
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return <div className="enter-inventory-page">page</div>;
};
export default HistoryEI;
