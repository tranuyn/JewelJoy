import React, { useState, useEffect } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import "./ordersPage.css";
import "../../styles/styles.css";
import { getAllBillBans, BillBanResponse } from "../../services/BillBanService";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

interface Column {
  id: "code" | "customer" | "order" | "date" | "options";
  label: string;
}

interface Data {
  code: string;
  customer: string;
  order: number;
  date: string;
  options: number;
}

const columns: Column[] = [
  { id: "code", label: "Mã đơn hàng" },
  { id: "customer", label: "Khách hàng" },
  { id: "order", label: "Chi tiết đơn hàng" },
  { id: "date", label: "Ngày đặt" },
  { id: "options", label: "Tùy chọn" },
];

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Đơn chưa chuẩn bị");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [rows, setRows] = useState<BillBanResponse[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API để lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllBillBans(); // Gọi API từ service
        setRows(data); // Cập nhật dữ liệu vào state
      } catch (err) {
        setError("Không thể tải dữ liệu đơn hàng!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  
  

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu tiên khi thay đổi số dòng
  };

  const startRow = page * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const displayedRows = rows.slice(startRow, endRow);

  const tabs = ["Đơn chưa chuẩn bị", "Đơn đã chuẩn bị"];

  return (
    <div className="orderPage">
      <Header title="Đơn hàng" />
      <div className="customTabbarPosition">
        <TabBar
          tabs={tabs}
          onTabChange={setActiveTab}
          styleType="custom"
          defaultTab="Đơn chưa chuẩn bị"
        />
      </div>
      <div className="page-content">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <table className="tableCotainer" style={{ width: "100%" }}>
              <thead className="theadContainer">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      style={{ padding: "5px", textAlign: "center" }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((row) => (
                  <tr key={row.code}>
                    {columns.map((column) => (
                      <td key={column.id}>{row[column.id as keyof Data]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="numberOfPageContainer">
              <select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <button
                className="ArrowButton"
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 0}
              >
                <KeyboardArrowLeftRoundedIcon />
              </button>
              <span>{` Page ${page + 1} of ${Math.ceil(
                rows.length / rowsPerPage
              )} `}</span>
              <button
                className="ArrowButton"
                onClick={() => handleChangePage(page + 1)}
                disabled={endRow >= rows.length}
              >
                <KeyboardArrowRightRoundedIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
