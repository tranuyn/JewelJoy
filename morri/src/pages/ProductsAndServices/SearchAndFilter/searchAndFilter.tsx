import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SearchAndFilter: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Ten");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAge(event.target.value);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  // Thêm sự kiện click để đóng dropdown khi click bên ngoài
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="psearch-container">
      <div className="psearchbar">
        <SearchIcon sx={{ color: "#737373" }} />
        <input type="search" placeholder="Tìm kiếm..." />
      </div>
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropbtn" onClick={toggleDropdown}>
          <span>Chất liệu</span>
          <KeyboardArrowDownIcon />
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <div>
              <Checkbox />
              <span>Kim cương</span>
            </div>
            <div>
              <Checkbox />
              <span>Bạch kim</span>
            </div>
            <div>
              <Checkbox />
              <span>Bạc</span>
            </div>
            <div>
              <Checkbox />
              <span>Vàng</span>
            </div>
          </div>
        )}
      </div>

      <select id="age" value={selectedAge} onChange={handleChange}>
        <option value="Increase">Giá tăng dần</option>
        <option value="Decrease">Giá giảm dần</option>
        <option value="Default">Mặc định</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
