import React from "react";
import { InventoryItem } from "./Inventory";
import SearchIcon from "@mui/icons-material/Search";

interface ReportTabProps {
  date: string;
}

const ReportTab: React.FC<ReportTabProps> = ({ date }) => {
  const reportColumns = [
    { id: "code", label: "Mã sản phẩm" },
    { id: "name", label: "Tên sản phẩm" },
    { id: "startQuantity", label: "Tồn đầu" },
    { id: "importQuantity", label: "Số lượng nhập" },
    { id: "exportQuantity", label: "Số lượng xuất" },
    { id: "endQuantity", label: "Tồn cuối" },
    { id: "material", label: "Chất liệu" },
  ];
  const reportData: InventoryItem[] = [ 
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

  return (
    <div className="page-content">
      <div
        className="report-header"
        style={{display: 'flex',
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Báo cáo tồn kho ngày {date}</h3>

        <div className="psearchbar" style={{ width:'30%',}}>
          <SearchIcon sx={{ color: "#737373" }} />
          <input type="search" placeholder="Tìm kiếm..." />
        </div>
          <button
            style={{
              backgroundColor: "#D7A05F",
              borderRadius: 5,
              border: 0,
              marginBottom: 10,
              justifySelf: "flex-end",
            }}
            // onClick={handleExportReport}
            className="hover:bg-blue-700 text-white font-bold"
          >
            Xuất file báo cáo
          </button>
      </div>
      <table className="tableCotainer" style={{ width: "100%" }}>
        <thead className="theadContainer">
          <tr>
            {reportColumns.map((column) => (
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
          {reportData.map((item) => (
            <tr key={item.product.code}>
              <td>{item.product.code}</td>
              <td>{item.product.name}</td>
              <td>{item.soLuongTonDau}</td>
              <td>{item.soLuongNhap}</td>
              <td>{item.soLuongBan}</td>
              <td>{item.soLuongTonCuoi}</td>
              <td>{item.product.material}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTab;
