import React, { useState } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import InventoryTab from "./InventoryTab";
import ReportTab from "./ReportTab";

// Types

export interface Data {
  code: string;
  name: string;
  quantity: number;
  unit: string;
  description: string;
  price: number;
  import_date: string;
  options: string;
}
export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  material: string;
  costPrice: number;
  sellingPrice: number;
  imageUrl: string[];
  loaiSanPham: string;
  quantity: number;
  weight: number;
  status: string;
  chiPhiPhatSinh: string;
  supplierId: string | null;
  entryDate: string | null;
}

export interface InventoryItem {
  product: Product;
  soLuongTonDau: number;
  soLuongNhap: number;
  soLuongBan: number;
  soLuongTonCuoi: number;
}
export interface Column {
  id: keyof (Product & { options: string });
  label: string;
}

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Kho");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tabs = ["Kho", "Báo cáo"];

  return (
    <div>
      <Header title="Kho hàng" />
      <div className="customTabbarPosition">
        <TabBar
          tabs={tabs}
          onTabChange={setActiveTab}
          styleType="custom"
          defaultTab="Kho"
        />
      </div>

      {activeTab === "Kho" ? (
        <InventoryTab
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <ReportTab date={new Date().toLocaleDateString()} />
      )}
    </div>
  );
};

export default Inventory;
