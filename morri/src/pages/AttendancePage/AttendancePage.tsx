import React, { useState } from "react";
import TabBar from "../../component/Tabbar/TabBar";
import Header from "../../component/Title_header/Header";
import DiemDanh from "./DiemDanh";
import TongHop from "./TongHop";
import XinVangModal from "./XinVangModal";
import { useAuth } from "../../services/useAuth";

const AttendancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Diem danh");
  const { user } = useAuth();

  const tabs = ["Diem danh", ...(user?.role === "ADMIN" ? ["Tong hop"] : [])];
  const renderContent = () => {
    switch (activeTab) {
      case "Diem danh":
        return <DiemDanh />;
      case "Tong hop":
        return user?.role === "ADMIN" ? <TongHop /> : null;
      default:
        return <DiemDanh />;
    }
  };
  return (
    <div style={{ backgroundColor: "#F9FCFF", height: "100%" }}>
      <Header title="Cham cong" />

      <TabBar
        tabs={tabs}
        onTabChange={setActiveTab}
        styleType="default"
        defaultTab="Diem danh"
      />

      <div className="page-content">
        <div className="content-text">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AttendancePage;
