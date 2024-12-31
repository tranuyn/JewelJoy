import React from "react";
import { Column, Data } from "./Inventory";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

interface InventoryTabProps {
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const columns: Column[] = [
  { id: "code", label: "Mã sản phẩm" },
  { id: "name", label: "Tên sản phẩm" },
  { id: "quantity", label: "Số lượng" },
  { id: "unit", label: "Đơn vị" },
  { id: "description", label: "Mô tả" },
  { id: "price", label: "Giá" },
  { id: "import_date", label: "Ngày nhập kho" },
  { id: "options", label: "Options" },
];

const createData = (
  code: string,
  name: string,
  quantity: number,
  unit: string,
  description: string,
  price: number,
  import_date: string,
  options: string
): Data => {
  return { code, name, quantity, unit, description, price, import_date, options };
};

const rows: Data[] = Array.from({ length: 100 }, (_, index) =>
  createData(
    `SP${index + 1}`,
    `Sản phẩm ${index + 1}`,
    Math.floor(Math.random() * 100),
    "Chiếc",
    `ML${index + 1}`,
    Math.random() * 1000000,
    new Date().toLocaleDateString(),
    "..."
  )
);

const InventoryTab: React.FC<InventoryTabProps> = ({
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const startRow = page * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const displayedRows = rows.slice(startRow, endRow);

  return (
    <div className="page-content">
      <table className="tableCotainer" style={{ width: "100%" }}>
        <thead className="theadContainer">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                style={{ padding: "8px", textAlign: "center" }}
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
                <td key={column.id}>{row[column.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="numberOfPageContainer">
        <select onChange={onRowsPerPageChange} value={rowsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
        <button
          className="ArrowButton"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          <KeyboardArrowLeftRoundedIcon />
        </button>
        <span>{` Page ${page + 1} of ${Math.ceil(
          rows.length / rowsPerPage
        )} `}</span>
        <button
          className="ArrowButton"
          onClick={() => onPageChange(page + 1)}
          disabled={endRow >= rows.length}
        >
          <KeyboardArrowRightRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default InventoryTab;
