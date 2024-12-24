import React, { useState } from "react";
import Header from "./header";
import TabBar from "../../component/Tabbar/TabBar";
import Charms from "./Charms";
// import VongCo from "./VongCo";
// import Nhan from "./Nhan";
// import HoaTai from "./HoaTai";
// import VongTay from "./VongTay";
import Services from "./Services";
import "./style.css";
import SearchAndFilter from "./SearchAndFilter/searchAndFilter";
const ProductsAndService: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const tabs = [
    "Tất cả",
    "Charms",
    "Vòng cổ",
    "Nhẫn",
    "Hoa tai",
    "Vòng tay",
    "Dịch vụ",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Charms":
        return <Charms />;
      //   case 'Vòng cổ':
      //     return <VongCo />;
      //   case 'Nhẫn':
      //     return <Nhan />;
      //   case 'Hoa tai':
      //     return <HoaTai />;
      //   case 'Vòng tay':
      //     return <VongTay />;
      case "Dịch vụ":
        return <Services />;
      default:
        return <div>Nội dung cho Tất cả</div>;
    }
  };

  return (
    <div style={{ backgroundColor: "#F9FCFF", height: "100%" }}>
      <Header />
      <div className="pbanner">
        <div className="pbannerTextContainer">
          <span className="pmorri">
            MORRI<br></br>JEWELRY
          </span>
          <span className="pTitle">
            <br />
            Mỗi một món trang sức đều có câu chuyện riêng. Đeo trang sức là cách
            thể hiện bạn trân trọng kỷ niệm mà không cần một lời nói nào.
          </span>
        </div>
      </div>

      <TabBar
        tabs={tabs}
        onTabChange={setActiveTab}
        styleType="default"
        defaultTab="Tất cả"
      />
      <SearchAndFilter />

      <div className="page-content">
        <div className="content-text">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProductsAndService;
