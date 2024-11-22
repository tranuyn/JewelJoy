import React, { useState } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import Charms from "./Charms";
// import VongCo from "./VongCo";
// import Nhan from "./Nhan";
// import HoaTai from "./HoaTai";
// import VongTay from "./VongTay";
import Services from "./Services";

const ProductsAndService: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');

  const tabs = [
    'Tất cả',
    'Charms',
    'Vòng cổ',
    'Nhẫn',
    'Hoa tai',
    'Vòng tay',
    'Dịch vụ'
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Charms':
        return <Charms />;
    //   case 'Vòng cổ':
    //     return <VongCo />;
    //   case 'Nhẫn':
    //     return <Nhan />;
    //   case 'Hoa tai':
    //     return <HoaTai />;
    //   case 'Vòng tay':
    //     return <VongTay />;
      case 'Dịch vụ':
        return <Services />;
      default:
        return <div>Nội dung cho Tất cả</div>;
    }
  };

  return (
    <div>
      <Header title="Đơn hàng"/>
      
      <TabBar 
        tabs={tabs}
        onTabChange={setActiveTab}
        styleType = 'default' 
        defaultTab="Tất cả" 
      />

      <div className="page-content">
        <div className="content-text">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductsAndService;