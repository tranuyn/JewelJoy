import React, { useState } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Đơn chưa chuẩn bị');
  
  const tabs = [
    'Đơn chưa chuẩn bị',
    'Đơn đang chuẩn bị',
    'Đơn đã chuẩn bị'
  ];

  return (
    <div>
      <Header title="Đơn hàng"/>
      
      <TabBar 
        tabs={tabs}
        onTabChange={setActiveTab}
        styleType = 'custom' 
        defaultTab="Đơn chưa chuẩn bị"
      />

      <div className="page-content">
        <div className="content-text">
          Nội dung cho {activeTab}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;