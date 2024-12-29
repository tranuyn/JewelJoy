import React, { useState } from "react";
import "./Dashboard.css";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DiamondIcon from "@mui/icons-material/Diamond";
import OrderIcon from "@mui/icons-material/ReceiptLong";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ImportWarehouseIcon from "@mui/icons-material/Input";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ServiceIcon from "@mui/icons-material/SupportAgent";
import TimeKeepingIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoImage from "./logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
interface DashboardProps {
  onToggle: (collapsed: boolean) => void;
  isCollapsed: boolean;
}
const MaterialIcon: React.FC<{ icon: React.ReactNode; active?: boolean }> = ({
  icon,
  active,
}) => <span className={`icon ${active ? "active" : ""}`}>{icon}</span>;

const menuItems = [
  { id: "HomeIcon", icon: <HomeIcon />, label: "Trang chủ", path: "/home" },
  {
    id: "products",
    icon: <DiamondIcon />,
    label: "Sản phẩm và dịch vụ",
    path: "/products",
  },
  { id: "orders", icon: <OrderIcon />, label: "Đơn hàng", path: "/orders" },
  {
    id: "warehouse",
    icon: <WarehouseIcon />,
    label: "Kho hàng",
    path: "/inventory",
  },
  {
    id: "import",
    icon: <ImportWarehouseIcon />,
    label: "Nhập kho",
    path: "/hehe",
  },
  {
    id: "returns",
    icon: <ShoppingBagIcon />,
    label: "Hàng mua lại",
    path: "/repurchase",
  },
  {
    id: "history",
    icon: <HistoryIcon />,
    label: "Lịch sử giao dịch",
    path: "/admin/history",
  },
  {
    id: "statistics",
    icon: <BarChartIcon />,
    label: "Thống kê",
    path: "/statistics",
  },
  {
    id: "salary",
    icon: <LocalAtmOutlinedIcon />,
    label: "Quản lý lương",
    path: "/admin/salary",
  },
  {
    id: "staff",
    icon: <GroupsIcon />,
    label: "Quản lý nhân viên",
    path: "/staff",
  },
  {
    id: "customers",
    icon: <PersonIcon />,
    label: "Quản lý khách hàng",
    path: "/admin/customer",
  },
  {
    id: "services",
    icon: <ServiceIcon />,
    label: "Quản lý dịch vụ",
    path: "/service",
  },
  {
    id: "feedback",
    icon: <TimeKeepingIcon />,
    label: "Chấm công",
    path: "/attendance",
  },
  {
    id: "settings",
    icon: <SettingsIcon />,
    label: "Cài đặt",
    path: "/settings",
  },
  {
    id: "logout",
    icon: <LogoutIcon />,
    label: "Đăng xuất",
    path: "/",
  },
];

const Dashboard: React.FC<DashboardProps> = ({ onToggle, isCollapsed }) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    onToggle(!isCollapsed);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {" "}
      <div className="logo">
        {!isCollapsed && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "200px",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <img src={LogoImage} alt="Shop Logo" />
              <span className="logo-text">M O R R I</span>
            </div>
          </>
        )}
        <button className="hamburger-button" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
      </div>
      <nav className="nav">
        <ul className="ul">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.id === "logout") {
                    handleLogout();
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`menu-item ${
                  activeItem === item.id ? "active" : ""
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <MaterialIcon
                  key={item.id}
                  icon={item.icon}
                  active={activeItem === item.id}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
