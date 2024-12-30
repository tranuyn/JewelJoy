import React, { useState, useEffect } from "react";
import "./style.css";
import InputCpn from "./inputComponent";
interface ProductFormProps {
  addProductForm: () => void; // Hàm để thêm form mới
}
const ProductForm: React.FC<ProductFormProps> = ({ addProductForm }) => {
  const handleAddForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Ngừng hành động mặc định (reload trang)
    addProductForm(); // Gọi hàm để thêm form mới
  };
  return (
    <form className="formEnterContainer">
      <div className="formTitleE">Thông tin sản phẩm</div>
      <button onClick={(e) => handleAddForm(e)}>+</button>
      <InputCpn
        title="Số điện thoại"
        name="supplierPhone"
        type="tel"
        placehoder="số điện thoại"
        pattern="[0-9]*"
        maxLength={10}
      />
      <InputCpn title="Tên nhà cung cấp" name="supplierName" />
      <InputCpn title="Địa chỉ nhà cung cấp" name="supplierAddress" />
    </form>
  );
};
export default ProductForm;
