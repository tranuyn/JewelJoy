import React, { useState } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import './ordersPage.css'
import '../../styles/styles.css'

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';


interface Column {
  id: 'code' | 'customer' | 'order' | 'date' | 'options';
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
  { id: 'code', label: 'Mã đơn hàng' },
  { id: 'customer', label: 'Khách hàng' },
  { id: 'order', label: 'Chi tiết đơn hàng' },
  { id: 'date', label: 'Ngày đặt' },
  { id: 'options', label: 'Tùy chọn' },
];

// Hàm tạo dữ liệu mẫu
const createData = (code: string, customer: string, order: number, date: string, options: number): Data => {
  return { code, customer, order, date, options };
};

// Dữ liệu mẫu
const rows: Data[] = Array.from({ length: 100 }, (_, index) =>
  createData(
    `Code ${index + 1}`,
    `Customer ${index + 1}`,
    Math.random() * 1000, // order là kiểu number
    new Date().toLocaleDateString(), // date là kiểu string
    Math.random() * 100 // options là kiểu number
  )
);



const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Đơn chưa chuẩn bị');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on change
  };

  const startRow = page * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const displayedRows = rows.slice(startRow, endRow);

  const tabs = [
    'Đơn chưa chuẩn bị',
    'Đơn đã chuẩn bị'
  ];

  return (
    <div className="orderPage">
      <Header title="Đơn hàng"/>
      <div className="customTabbarPosition">
        <TabBar 
          tabs={tabs}
          onTabChange={setActiveTab}
          styleType = 'custom' 
          defaultTab="Đơn chưa chuẩn bị"
        />
      </div>
      <div className="page-content">
        <table className="tableCotainer" style={{ width: '100%'}}>
          <thead className="theadContainer">
            <tr>
              {columns.map((column) => (
                <th key={column.id} style={{ padding: '8px', textAlign: 'center' }}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row) => (
              <tr key={row.code} >
                {columns.map((column) => (
                  <td key={column.id}>
                    {row[column.id]}
                  </td>
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
          <button className="ArrowButton" onClick={() => handleChangePage(page - 1)} disabled={page === 0}>
            <KeyboardArrowLeftRoundedIcon/>
          </button>
          <span>{` Page ${page + 1} of ${Math.ceil(rows.length / rowsPerPage)} `}</span>
          <button className="ArrowButton" onClick={() => handleChangePage(page + 1)} disabled={endRow >= rows.length}>
            <KeyboardArrowRightRoundedIcon/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;