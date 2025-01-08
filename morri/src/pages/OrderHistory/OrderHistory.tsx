import React, { useState } from 'react';
import TabBar from '../../component/Tabbar/TabBar';
// import { OrderItem } from './types';
import './orderHistory.css';
import BackgroundOrder from "../../assets/constant/background.jpg";

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    type: string;
    status: string;
    orderTime: string;
  }
const OrderHistory: React.FC = () => {
    
  const [activeTab, setActiveTab] = useState('Tất cả');

  const tabs = ['Tất cả', 'Chờ xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'];

  // Mock data for different order statuses
  const mockOrders: OrderItem[] = [
    {
      id: 1,
      name: 'Elegant Gold Earrings with Luxurious Design for Every Occasion and Style',
      quantity: 4,
      price: 320.00,
      type: 'Earring',
      status: 'Chờ xác nhận',
      orderTime: '20:30:31 ngày 11/12/2024'
    },
    {
      id: 2,
      name: 'Stunning Emerald Teardrop Hoop Earrings with a Dazzling Design for Effortless Elegance',
      quantity: 1,
      price: 220.00,
      type: 'Earring',
      status: 'Chờ xác nhận',
      orderTime: '20:30:31 ngày 11/12/2024'
    },
    // Add more orders with different statuses
    {
      id: 3,
      name: 'Diamond Stud Earrings',
      quantity: 2,
      price: 450.00,
      type: 'Earring',
      status: 'Đang giao',
      orderTime: '19:30:31 ngày 11/12/2024'
    },
    {
      id: 4,
      name: 'Pearl Drop Earrings',
      quantity: 1,
      price: 280.00,
      type: 'Earring',
      status: 'Đã giao',
      orderTime: '18:30:31 ngày 11/12/2024'
    },
    {
      id: 5,
      name: 'Sapphire Stud Earrings',
      quantity: 3,
      price: 330.00,
      type: 'Earring',
      status: 'Đã hủy',
      orderTime: '17:30:31 ngày 11/12/2024'
    }
  ];

  const getFilteredOrders = () => {
    if (activeTab === 'Tất cả') {
      return mockOrders;
    }
    return mockOrders.filter(order => order.status === activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const calculateTotal = (orders: OrderItem[]) => {
    return orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="order-history-root">
      <div className="order-header" style={{
      backgroundImage: `url(${BackgroundOrder})`,
      height: '250px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative', // Make it relative to position the overlay
      marginBottom: '50px',
    }}>
      <div style={{
        position: 'absolute', // Position it absolutely
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // White overlay with 50% opacity
        zIndex: 1, // Ensure it sits above the background
      }} />
      <div style={{
        position: 'relative', // Keep the text above the overlay
        color: 'white', // Change text color as needed
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 2, // Ensure text is above the overlay
      }}>
        Đơn hàng
      </div>
    </div>

      <div className="tab-section">
        <TabBar
          tabs={tabs}
          onTabChange={handleTabChange}
          defaultTab="Tất cả"
          styleType="custom"
        />
      </div>

      <div className="orderhistory-container">
        {filteredOrders.map((order) => (
          <div key={order.id} className="orderhistory-card">
            <div className="orderhistory-details">
              <div className="orderhistory-info">
                <h3 className="product-name">{order.name}</h3>
                <p className="product-type">{order.type}</p>
                <p className="quantity">x{order.quantity}</p>
              </div>
              <div className="price-info">
                <p className="price">${order.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="orderhistory-summary">
        <div className="total">
          Thành tiền: <span>${calculateTotal(filteredOrders).toFixed(2)}</span>
        </div>
        <button className="cancel-button">
          Hủy đơn
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;