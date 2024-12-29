import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import CachedIcon from "@mui/icons-material/Cached";

interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[];
  quantityInBill: number;
  loaiSanPham: string;
}

interface BillProps {
  selectedProducts: ProductType[]; // Array of selected products
  // onRemoveProduct: (id: string) => void; // Function to remove a product
}

const Bill: React.FC<BillProps> = ({ selectedProducts }) => {
  return <div>selectedProducts.map()</div>;
};

export default Bill;
