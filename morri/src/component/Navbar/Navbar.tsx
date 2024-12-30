import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import logoImage from "./logo.png";
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="nav-section logo-section">
        <img src={logoImage} alt="MORRI" className="logoNavbar" />
      </div>

      {/* Store Info Section */}
      <div className="nav-section store-info">
        <div className="nav-item">
          <LocationOnIcon className="icon" />
          <span>Cửa hàng</span>
        </div>
        <div className="nav-item">
          <PhoneIcon className="icon" />
          <span>Hotline: 0939800899</span>
        </div>
      </div>

      {/* User Actions Section */}
      <div className="nav-section user-actions">
        <div className="nav-item">
          <ReceiptIcon className="icon" />
          <span>Đơn hàng</span>
        </div>
        <div className="nav-item">
          <ShoppingCartIcon className="icon" />
          <span>Giỏ hàng</span>
        </div>
        <div className="nav-item">
          <PersonIcon className="icon" />
          <span>Peter</span>
        </div>
        <div className="nav-item">
          <LogoutIcon className="icon" />
        </div>
      </div>
    </nav>
  );
};