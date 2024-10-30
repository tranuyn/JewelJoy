import React, { useState } from 'react';
import './Dashboard.css';
import HomeIcon from '@mui/icons-material/Home';
import DiamondIcon from '@mui/icons-material/Diamond';
import OrderIcon from '@mui/icons-material/ReceiptLong';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ImportWarehouseIcon from '@mui/icons-material/Input';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import ServiceIcon from '@mui/icons-material/SupportAgent';
import TimeKeepingIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoImage from './logo.png';

const MaterialIcon: React.FC<{ icon: React.ReactNode; active?: boolean }> = ({ icon, active }) => (
  <span className={`icon ${active ? 'active' : ''}`}>
    {icon}
  </span>
);

const menuItems = [
  { id: 'HomeIcon', icon: <HomeIcon />, label: 'Trang chủ' },
  { id: 'products', icon: <DiamondIcon />, label: 'Sản phẩm và dịch vụ' },
  { id: 'orders', icon: <OrderIcon />, label: 'Đơn hàng' },
  { id: 'warehouse', icon: <WarehouseIcon />, label: 'Kho hàng' },
  { id: 'import', icon: <ImportWarehouseIcon />, label: 'Nhập kho' },
  { id: 'returns', icon: <ShoppingBagIcon />, label: 'Hàng mua lại' },
  { id: 'history', icon: <HistoryIcon />, label: 'Lịch sử giao dịch' },
  { id: 'statistics', icon: <BarChartIcon />, label: 'Thống kê' },
  { id: 'staff', icon: <GroupsIcon />, label: 'Quản lý nhân viên' },
  { id: 'customers', icon: <PersonIcon />, label: 'Quản lý khách hàng' },
  { id: 'services', icon: <ServiceIcon />, label: 'Quản lý dịch vụ' },
  { id: 'feedback', icon: <TimeKeepingIcon />, label: 'Chấm công' },
  { id: 'settings', icon: <SettingsIcon />, label: 'Cài đặt' }
];

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={LogoImage} alt="Shop Logo" />
        <span className="logo-text">M O R R I</span>
      </div>

      <nav className="nav">
        <ul className="ul">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              >
                <MaterialIcon
                  key={item.id}
                  icon={item.icon}
                  active={activeItem === item.id}
                />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
