import React, { useState } from "react";
import "./salaryPage.css";

const customerData = [
  {
    name: "Jack",
    registrationDate: "10/10/2024",
    orderCount: 10,
    cancelledOrders: 10,
    gender: "Nữ",
    phoneNumber: "089374984",
  },
  {
    name: "Jack2",
    registrationDate: "05/10/2024",
    orderCount: 3,
    cancelledOrders: 3,
    gender: "Nam",
    phoneNumber: "089374984",
  },
  {
    name: "J97",
    registrationDate: "15/09/2024",
    orderCount: 7,
    cancelledOrders: 7,
    gender: "Nữ",
    phoneNumber: "089374984",
  },
  {
    name: "Phương Tuấn",
    registrationDate: "12/10/2024",
    orderCount: 9,
    cancelledOrders: 9,
    gender: "Nam",
    phoneNumber: "089374984",
  },
  {
    name: "MTP",
    registrationDate: "12/08/2024",
    orderCount: 4,
    cancelledOrders: 4,
    gender: "Nữ",
    phoneNumber: "089374984",
  },
  {
    name: "Oggy",
    registrationDate: "11/05/2023",
    orderCount: 5,
    cancelledOrders: 5,
    gender: "Nam",
    phoneNumber: "089374984",
  },
  {
    name: "Ogway",
    registrationDate: "15/07/2023",
    orderCount: 5,
    cancelledOrders: 5,
    gender: "Nữ",
    phoneNumber: "089374984",
  },
  {
    name: "Doremon",
    registrationDate: "07/07/2024",
    orderCount: 7,
    cancelledOrders: 7,
    gender: "Nam",
    phoneNumber: "089374984",
  },
  {
    name: "Naruto",
    registrationDate: "29/03/2024",
    orderCount: 9,
    cancelledOrders: 9,
    gender: "Nữ",
    phoneNumber: "089374984",
  },
  {
    name: "Obito",
    registrationDate: "02/06/2024",
    orderCount: 5,
    cancelledOrders: 5,
    gender: "Nam",
    phoneNumber: "089374984",
  },
];

const SalaryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sell" | "buy">("sell");

  return (
    <div className="customer-management">
      <h1>Quản lý khách hàng</h1>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "sell" ? "active" : ""}`}
          onClick={() => setActiveTab("sell")}
        >
          Khách hàng bán
        </button>
        <button
          className={`tab ${activeTab === "buy" ? "active" : ""}`}
          onClick={() => setActiveTab("buy")}
        >
          Khách hàng mua
        </button>
      </div>

      <div className="details-section">
        <div className="details-header">
          <h2>
            Details <span className="count">142</span>
          </h2>
          <div className="actions">
            <button className="icon-button delete">
              <i className="trash-icon"></i>
            </button>
            <button className="icon-button edit">
              <i className="edit-icon"></i>
            </button>
          </div>
        </div>

        <div className="filters">
          <input type="text" placeholder="Tên khách hàng" className="filter" />
          <select className="filter">
            <option>Ngày đăng ký</option>
          </select>
          <select className="filter">
            <option>Số lượng đơn đã bán</option>
          </select>
          <select className="filter">
            <option>Số lượng đơn đã hủy</option>
          </select>
          <select className="filter">
            <option>Giới tính</option>
          </select>
          <select className="filter">
            <option>SĐT</option>
          </select>
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th></th>
              <th>Tên khách hàng</th>
              <th>Ngày đăng ký</th>
              <th>Số lượng đơn đã bán</th>
              <th>Số lượng đơn đã hủy</th>
              <th>Giới tính</th>
              <th>SĐT</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer, index) => (
              <tr key={index}>
                <td>
                  <input type="radio" name="customer-select" />
                </td>
                <td>{customer.name}</td>
                <td>{customer.registrationDate}</td>
                <td>{customer.orderCount}</td>
                <td>{customer.cancelledOrders}</td>
                <td>{customer.gender}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryPage;
