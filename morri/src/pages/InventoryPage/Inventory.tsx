import React, { useState } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import InventoryTab from "./InventoryTab";
import ReportTab from "./ReportTab";

// Types
export interface Column {
  id: "code" | "name" | "quantity" | "unit" | "description" | "price" | "import_date" | "options";
  label: string;
}

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