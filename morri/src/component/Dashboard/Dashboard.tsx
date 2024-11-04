import React, { useState } from 'react';
import './Dashboard.css';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DiamondIcon from '@mui/icons-material/Diamond';
import OrderIcon from '@mui/icons-material/ReceiptLong';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import ImportWarehouseIcon from '@mui/icons-material/Input';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
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
  { id: 'HomeRoundedIcon', icon: <HomeRoundedIcon />, label: 'Trang chủ' },
  { id: 'products', icon: <DiamondIcon />, label: 'Sản phẩm và dịch vụ' },
  { id: 'orders', icon: <OrderIcon />, label: 'Đơn hàng' },
  { id: 'warehouse', icon: <WarehouseRoundedIcon />, label: 'Kho hàng' },
  { id: 'import', icon: <ImportWarehouseIcon />, label: 'Nhập kho' },
  { id: 'returns', icon: <ShoppingBagIcon />, label: 'Hàng mua lại' },
  { id: 'history', icon: <HistoryIcon />, label: 'Lịch sử giao dịch' },
  { id: 'statistics', icon: <LeaderboardRoundedIcon />, label: 'Thống kê' },
  { id: 'salary', icon: <PaidRoundedIcon />, label: 'Quản lý lương' },
  { id: 'staff', icon: < GroupRoundedIcon/>, label: 'Quản lý nhân viên' },
  { id: 'customers', icon: <GroupsIcon />, label: 'Quản lý khách hàng' },
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
