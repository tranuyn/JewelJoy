import React, { useRef, useEffect, useState } from "react";
import TabBar from "../../component/Tabbar/TabBar";
import { Box } from "@mui/material";
import VaoLam from "./VaoLam";
import TanLam from "./TanLam";

const DiemDanh = () => {
  const [activeTab, setActiveTab] = React.useState("Vao lam");
  const [isModalXinVangOpen, setIsModalXinVangOpen] = useState(false);
  const handleXinVang = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsModalXinVangOpen(false);
  };

  const tabs = ["Vao lam", "Tan lam"];

  const renderContent = () => {
    if (activeTab === "Vao lam") {
      return (
        <VaoLam
          isModalOpen={isModalXinVangOpen}
          setIsModalOpen={setIsModalXinVangOpen}
          handleXinVang={handleXinVang}
        />
      );
    } else if (activeTab === "Tan lam") {
      return (
        <TanLam
          isModalOpen={isModalXinVangOpen}
          setIsModalOpen={setIsModalXinVangOpen}
          handleXinVang={handleXinVang}
        />
      );
    }
  };
  return (
    <>
      <div>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <TabBar
            tabs={tabs}
            onTabChange={setActiveTab}
            defaultTab="Vao lam"
            styleType="custom"
          />
        </Box>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default DiemDanh;
