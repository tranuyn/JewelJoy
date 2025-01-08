import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onMaterialFilter: (materials: string[]) => void;
  onSort: (sortType: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onMaterialFilter,
  onSort,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Default");

  const [searchValue, setSearchValue] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<{
    [key: string]: boolean;
  }>({
    "Kim cương": false,
    "Bạch kim": false,
    Bạc: false,
    Vàng: false,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleMaterialChange = (material: string) => {
    const newSelectedMaterials = {
      ...selectedMaterials,
      [material]: !selectedMaterials[material],
    };
    setSelectedMaterials(newSelectedMaterials);

    // Convert to array of selected materials
    const selectedMaterialArray = Object.entries(newSelectedMaterials)
      .filter(([_, isSelected]) => isSelected)
      .map(([material]) => material);

    onMaterialFilter(selectedMaterialArray);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSort(value);
    onSort(value);
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
        <input
          type="search"
          placeholder="Tìm kiếm..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropbtn" onClick={toggleDropdown}>
          <span>Chất liệu</span>
          <KeyboardArrowDownIcon />
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            {Object.keys(selectedMaterials).map((material) => (
              <div key={material}>
                <Checkbox
                  checked={selectedMaterials[material]}
                  onChange={() => handleMaterialChange(material)}
                />
                <span>{material}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <select
        className="SapXep"
        id="age"
        value={selectedSort}
        onChange={handleSortChange}
      >
        <option value="Increase">Giá tăng dần</option>
        <option value="Decrease">Giá giảm dần</option>
        <option value="Default">Mặc định</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
