import React from "react";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Product } from "./Inventory";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

interface InventoryTabProps {
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Define the structure for display data
interface DisplayRow {
  id: string;
  code: string;
  name: string;
  quantity: number;
  material: string;
  description: string;
  sellingPrice: number;
  status: string;
  options: string;
}

interface Column {
  id: keyof DisplayRow;
  label: string;
}
const columns: Column[] = [
  { id: "code", label: "Mã sản phẩm" },
  { id: "name", label: "Tên sản phẩm" },
  { id: "quantity", label: "Số lượng" },
  { id: "material", label: "Chất liệu" },
  { id: "description", label: "Mô tả" },
  { id: "sellingPrice", label: "Giá bán" },
  { id: "status", label: "Trạng thái" },
  { id: "options", label: "Tùy chọn" },
];

const StyledIconButton = styled(IconButton)`
  margin: 4px 0px;
`;

const inventoryData = [
  {
    product: {
      id: "674fc0f59631a835e84c5737",
      name: "PNJ Jasmine ZTMXY000005",
      code: "ZTMXY000005",
      description:
        "Sở hữu thiết kế thời thượng cùng các sắc đá kiêu sa, Disney|Morri tự hào mang đến đôi bông tai với vẻ đẹp dịu dàng nhưng không kém phần cá tính được lấy cảm hứng từ nàng công chúa Jasmine. Bên cạnh đó, sản phẩm còn được chế tác từ chất liệu bạc cao cấp nên đôi bông tai luôn sở hữu độ bền đẹp theo thời gian. Cùng Disney|Morri làm mới phong cách với đôi bông tai bạc tinh tế này nhé nàng ơi! Bởi sự tinh tế trong nó chính là điểm nhấn đặc biệt giúp nàng trở nên nổi bần bật và lan tỏa sức hút từ thần thái của mình.",
      material: "Vàng",
      costPrice: 500.0,
      sellingPrice: 799999.0,
      quantity: 9,
      status: "available",
      imageUrl: [],
      loaiSanPham: "BONGTAI",
      weight: 4.30783,
      chiPhiPhatSinh: "100000.0",
      supplierId: null,
      entryDate: null,
    },
    soLuongTonDau: 4,
    soLuongNhap: 5,
    soLuongBan: 0,
    soLuongTonCuoi: 9,
  },
  {
    product: {
      id: "67619bdb78486b3eae061a6a",
      name: "PNJ Jasmin ZTMXY000006",
      code: "ZTMXY000006",
      description:
        "Sở hữu thiết kế thời thượng cùng các sắc đá kiêu sa, Disney|Morri tự hào mang đến đôi bông tai với vẻ đẹp dịu dàng nhưng không kém phần cá tính được lấy cảm hứng từ nàng công chúa Jasmine. Bên cạnh đó, sản phẩm còn được chế tác từ chất liệu bạc cao cấp nên đôi bông tai luôn sở hữu độ bền đẹp theo thời gian. Cùng Disney|Morri làm mới phong cách với đôi bông tai bạc tinh tế này nhé nàng ơi! Bởi sự tinh tế trong nó chính là điểm nhấn đặc biệt giúp nàng trở nên nổi bần bật và lan tỏa sức hút từ thần thái của mình.",
      material: "Vàng",
      costPrice: 500.0,
      sellingPrice: 799999.0,
      imageUrl: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV5YkHk6_kgsAM5zgHvVk5wkXiopA1HxgU6g&s",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045511/ec434feb-26f3-4021-8a5e-38580e97f04e_bku9y4.jpg",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045512/0ab0091c-479c-492e-aa9e-65d6a2c0e2ba_bjbznb.png",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045512/23089cce-b222-4989-b7bd-4b42b573f14e_mhltgj.png",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045511/63c83f25-6ac9-48a3-a0c1-98685e357366_o6b8of.jpg",
      ],
      loaiSanPham: "BONGTAI",
      quantity: 10,
      weight: 4.30783,
      status: "available",
      chiPhiPhatSinh: "100000.0",
      supplierId: null,
      entryDate: null,
    },
    soLuongTonDau: 8,
    soLuongNhap: 2,
    soLuongBan: 0,
    soLuongTonCuoi: 10,
  },
  {
    product: {
      id: "6762955afa7d306ec93c0f49",
      name: "PNJ Jasmin ZTMXY00007",
      code: "ZTMXY000007",
      description:
        "Sở hữu thiết kế thời thượng cùng các sắc đá kiêu sa, Disney|Morri tự hào mang đến đôi bông tai với vẻ đẹp dịu dàng nhưng không kém phần cá tính được lấy cảm hứng từ nàng công chúa Jasmine. Bên cạnh đó, sản phẩm còn được chế tác từ chất liệu bạc cao cấp nên đôi bông tai luôn sở hữu độ bền đẹp theo thời gian. Cùng Disney|Morri làm mới phong cách với đôi bông tai bạc tinh tế này nhé nàng ơi! Bởi sự tinh tế trong nó chính là điểm nhấn đặc biệt giúp nàng trở nên nổi bần bật và lan tỏa sức hút từ thần thái của mình.",
      material: "Vàng",
      costPrice: 500.0,
      sellingPrice: 799999.0,
      imageUrl: [
        "https://genmaz.com/pictures/product/01/22/bong-tai-iconic-swan-thien-nga-mau-bac-5647545_1.jpg",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045511/ec434feb-26f3-4021-8a5e-38580e97f04e_bku9y4.jpg",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045512/0ab0091c-479c-492e-aa9e-65d6a2c0e2ba_bjbznb.png",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045512/23089cce-b222-4989-b7bd-4b42b573f14e_mhltgj.png",
        "https://res.cloudinary.com/dzdso60ms/image/upload/v1733045511/63c83f25-6ac9-48a3-a0c1-98685e357366_o6b8of.jpg",
      ],
      loaiSanPham: "BONGTAI",
      quantity: 9,
      weight: 4.30783,
      status: "available",
      chiPhiPhatSinh: "100000.0",
      supplierId: null,
      entryDate: null,
    },
    soLuongTonDau: 9,
    soLuongNhap: 0,
    soLuongBan: 0,
    soLuongTonCuoi: 9,
  },
  // ... other items
];

const rows = inventoryData.map((item) => ({
  ...item.product,
  options: "...",
}));

const InventoryTab: React.FC<InventoryTabProps> = ({
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const startRow = page * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const displayedRows = rows.slice(startRow, endRow);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="page-content">
      
      <div className="psearchbar" style={{ marginBottom: 10,}}>
          <SearchIcon sx={{ color: "#737373" }} />
          <input type="search" placeholder="Tìm kiếm..." />
        </div>
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
                <td key={column.id} style={{ textAlign: "center" }}>
                  {column.id === "sellingPrice" ? (
                    formatPrice(row[column.id] as number)
                  ) : column.id === "options" ? ( // Kiểm tra cột "options"
                    <>
                      <StyledIconButton
                        className={`edit-button`}
                        size="small"
                        // onClick={}
                      >
                        <BorderColorIcon fontSize="small" />
                      </StyledIconButton>
                      <StyledIconButton
                        className="delete-button"
                        size="small"
                        // onClick={}
                      >
                        <DeleteIcon fontSize="small" />
                      </StyledIconButton>
                    </>
                  ) : (
                    row[column.id]
                  )}
                  {}
                </td>
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
