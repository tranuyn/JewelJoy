import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InventoryItem } from "./Inventory";

interface ReportTabProps {
  date: string;
}

const ReportTab: React.FC<ReportTabProps> = ({ date }) => {
  const [reportData, setReportData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reportColumns = [
    { id: "code", label: "Mã sản phẩm" },
    { id: "name", label: "Tên sản phẩm" },
    { id: "startQuantity", label: "Tồn đầu" },
    { id: "importQuantity", label: "Số lượng nhập" },
    { id: "exportQuantity", label: "Số lượng xuất" },
    { id: "endQuantity", label: "Tồn cuối" },
    { id: "material", label: "Chất liệu" },
  ];

  useEffect(() => {
    const fetchInventoryReport = async () => {
      setLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0] + 'T15:30:00';
        
        const response = await fetch('http://localhost:8081/inventory/getInventoryByDay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(today)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // const data = await response.json();
        // console.log(data)
        const data:InventoryItem[] = await response.json();
        const filteredProducts = data.filter(item => item.product.code !== null);
        setReportData(filteredProducts);
        setFilteredData(filteredProducts);
      } catch (error) {
        console.error('Error fetching inventory report:', error);
        setError('Không thể tải dữ liệu báo cáo!');
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryReport();
  }, []);

  // Search functionality
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = reportData.filter(item =>
      item.product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  // Export functionality
  const handleExportReport = () => {
    // Create table headers
    let printContent = `
      <html>
        <head>
          <title>Báo cáo tồn kho ngày ${date}</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .report-title {
              text-align: center;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h2 class="report-title">Báo cáo tồn kho ngày ${date}</h2>
          <table>
            <thead>
              <tr>
                ${reportColumns.map(column => `<th>${column.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;

    // Add table data
    filteredData.forEach(item => {
      printContent += `
        <tr>
          <td>${item.product.code}</td>
          <td>${item.product.name}</td>
          <td>${item.soLuongTonDau}</td>
          <td>${item.soLuongNhap}</td>
          <td>${item.soLuongBan}</td>
          <td>${item.soLuongTonCuoi}</td>
          <td>${item.product.material}</td>
        </tr>
      `;
    });

    printContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Create a new window and print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div className="page-content">
      <div
        className="report-header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Báo cáo tồn kho ngày {date}</h3>

        <div className="psearchbar" style={{ width: "30%" }}>
          <SearchIcon sx={{ color: "#737373" }} />
          <input 
            type="search" 
            placeholder="Tìm kiếm..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          style={{
            backgroundColor: "#D7A05F",
            borderRadius: 5,
            border: 0,
            marginBottom: 10,
            justifySelf: "flex-end",
            padding: "8px 16px",
            cursor: "pointer"
          }}
          onClick={handleExportReport}
          className="exportFileText"
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
          {filteredData.map((item) => (
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