import React, { useEffect, useState, ReactNode } from "react";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import TableComponent from "../../component/TableComponent/TableComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import { Box, Modal, CircularProgress } from "@mui/material";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import FeedIcon from "@mui/icons-material/Feed";
import { useNavigate } from "react-router-dom";
export interface Column {
  id:
    | "id"
    | "date"
    | "supplier"
    | "staff"
    | "name"
    | "inventoryProducts"
    | "totalPrice"
    | "note"
    | "options";
  label: string;
}

const columns: Column[] = [
  { id: "id", label: "Mã phiếu" },
  { id: "date", label: "Ngày tạo phiếu" },
  { id: "supplier", label: "Nhà cung cấp" },
  { id: "staff", label: "Người lập phiếu" },
  { id: "name", label: "Mô tả phiếu" },
  { id: "inventoryProducts", label: "Danh sách sản phẩm" },
  { id: "totalPrice", label: "Tổng giá trị" },
  { id: "note", label: "Ghi chú" },
  { id: "options", label: "Options" },
];

interface Data {
  id: string;
  date: string;
  supplier: string;
  staff: string;
  name: string;
  inventoryProducts: ReactNode;
  totalPrice: number;
  note: string;
  options: ReactNode;
}

const createData = (
  id: string,
  date: string,
  supplier: string,
  staff: string,
  name: string,
  inventoryProducts: ReactNode,
  totalPrice: number,
  note: string,
  options: ReactNode
): Data => {
  return {
    id,
    date,
    supplier,
    staff,
    name,
    inventoryProducts,
    totalPrice,
    note,
    options,
  };
};

const HistoryEI: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // await handleDelete();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("vi-VN"); // Định dạng ngày theo tiếng Việt

    const formattedTime = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }); // Định dạng giờ

    return `${formattedDate}\n${formattedTime}`; // Kết hợp ngày và giờ với xuống dòng
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/inventory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM2MTA4MjQzLCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzYxNDQyNDN9.PIPD7WdlZbGCC2bvnk_5KKjGsjDlT51FfPfu0HJ-GUk",
        },
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("Không thể tải dữ liệu đơn hàng!");
      }

      const data = await response.json();
      console.log(data);

      // Chuyển đổi dữ liệu API để phù hợp với cấu trúc bảng
      const transformedRows = data.map((item: any) => {
        return createData(
          item.id,
          formatDate(item.ngayNhapKho),
          item.supplier?.supplierName || "Không xác định",
          item.user?.name || "Không xác định",
          item?.name || "Không xác định",
          <div>
            {item?.inventoryProducts?.map((product: any) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={product?.product?.imageUrl[0]}
                  alt={product?.product?.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: "500" }}>
                    {product?.product?.name}
                  </div>
                  <div>SL: {product.enteredQuantity}</div>
                </div>
              </div>
            )) || <div>Không có sản phẩm</div>}
          </div>,
          item?.totalPrice || 0,
          item.note || "",
          <div className="three-icon">
            <FeedIcon
              fontSize="small"
              className="editbtn"
              onClick={() => navigate(`/enter-inventory/${item.id}`)}
            />
            <BorderColorIcon fontSize="small" className="editbtn" />
            <DeleteIcon fontSize="small" className="editbtn" />
          </div>
        );
      });

      setRows(transformedRows);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                style={{
                  padding: "8px",
                  textAlign: "center",
                  maxWidth: column.id === "id" ? "200px" : "auto",
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {displayedRows.map((row) => (
            <tr key={row.id} className="EIrow">
              {columns.map((column) => (
                <td
                  key={column.id}
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    maxWidth: "100px",
                    wordWrap: "break-word",
                  }}
                >
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

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "16px",
            }}
          >
            Bạn có chắc chắn muốn xoá{" "}
            <span style={{ color: "#d32f2f" }}>{deleteName}</span> không?
          </div>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <BtnComponent
              btnColorType="close"
              btnText="Huỷ"
              onClick={() => setIsModalOpen(false)}
            />
            <BtnComponent
              btnColorType="primary"
              btnText={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Xác nhận"
                )
              }
              onClick={handleConfirmDelete}
              disabled={loading}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default HistoryEI;
