import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import CachedIcon from "@mui/icons-material/Cached";
import CustomerSection from "./CustomerSection";
import StaffSection from "./StaffSection";
import Bill from "./Bill";

interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[];
  quantityInBill: number;
  loaiSanPham: string;
}

interface LocationState {
  selectedProducts: ProductType[];
  quantities: Record<string, number>;
}

const Checkout = () => {
  const location = useLocation(); // Explicitly type the location
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>(
    location.state?.selectedProducts || [] // Fallback to an empty array if state is undefined
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(
    location.state?.quantities || {} // Fallback to an empty object if state is undefined
  );
  useEffect(() => {
    if (location.state) {
      setSelectedProducts(location.state.selectedProducts);
      setQuantities(location.state.quantities);
    }
  }, [location.state]);

  return (
    <div
      style={{
        backgroundColor: "#F9FCFF",
        height: "100%",
        padding: "20px 0px",
      }}
    >
      <div
        style={{
          color: "#000",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Tổng quan đơn hàng
      </div>
      {selectedProducts.length === 0 ? (
        <div>
          <p>
            <a href="/products">Vui lòng thêm sản phẩm vào đơn hàng</a>
          </p>
        </div>
      ) : (
        <div>
          <CustomerSection />
          <StaffSection />
          <Bill selectedProducts={selectedProducts} />
        </div>
      )}
    </div>
  );
};

export default Checkout;
