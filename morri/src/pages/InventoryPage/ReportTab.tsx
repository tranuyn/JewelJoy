import React from 'react';

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
    { id: "unit", label: "Đơn vị" },
  ];

  return (
    <div className="page-content">
      <div className="report-header">
        <h3>Báo cáo tồn kho ngày {date}</h3>
      </div>
      <table className="tableCotainer" style={{ width: "100%" }}>
        <thead className="theadContainer">
          <tr>
            {reportColumns.map((column) => (
              <th key={column.id} style={{ padding: "8px", textAlign: "center" }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Add your report data here */}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTab;