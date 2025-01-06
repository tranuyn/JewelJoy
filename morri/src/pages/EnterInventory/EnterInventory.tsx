import React, { useState, useEffect } from "react";
import Header from "../../component/Title_header/Header";
import "./style.css";
import TabBar from "../../component/Tabbar/TabBar";
import CreateEI from "./CreateEnterInventory";
import HistoryEI from "./HistoryEI";
const EnterInventory: React.FC = () => {
  const tabs = ["Tạo phiếu nhập kho", "Lịch sử nhập kho"];
  const [activeTab, setActiveTab] = useState("Tạo phiếu nhập kho");

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="EinventoryContainer">
      <Header title="Nhập kho" />
      <div className="customTabbarPosition">
        <TabBar
          tabs={tabs}
          onTabChange={setActiveTab}
          styleType="custom"
          defaultTab="Tạo phiếu nhập kho"
        />
      </div>

      {activeTab === "Tạo phiếu nhập kho" ? <CreateEI /> : <HistoryEI />}
    </div>
  );
};

export default EnterInventory;
