import React, { useState, useEffect } from "react";
import "./style.css";
import InputCpn from "./inputComponent";
import ProductForm from "./ProductForm";
const CreateEI: React.FC = () => {
  const addProductForm = () => {
    setProductForms((prevForms) => [
      ...prevForms,
      <ProductForm key={productForms.length} addProductForm={addProductForm} />,
    ]);
  };
  const [productForms, setProductForms] = useState<JSX.Element[]>([
    <ProductForm key={0} addProductForm={addProductForm} />, // Form mặc định ban đầu
  ]);

  return (
    <div className="enter-inventory-page">
      <div className="threeForm">
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin nhà cung cấp</div>
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
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin nhân viên nhập kho</div>
          <div className="input-containerE">
            <label className="input-labelE">Họ tên nhân viên</label>
            <select className="input-fieldE" defaultValue="">
              <option value="VN">Nga</option>
              <option value="US">Uyên</option>
              <option value="UK">Ngọc</option>
            </select>
          </div>

          <InputCpn title="Email nhân viên" name="emailStaff" disabled={true} />
          <InputCpn title="Số điện thoại" name="staffPhone" disabled={true} />
        </form>
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin phiếu nhập kho</div>
          <InputCpn title="Ngày nhập" name="dateEnter" type="date" />
          <InputCpn title="Tổng giá trị phiếu" type="tel" name="ivtrValue" />
          <InputCpn title="Ghi chú" name="note" />
        </form>
      </div>

      <div className="twoForm">
        {productForms.map((form, index) => (
          <div key={index}>{form}</div>
        ))}
      </div>
    </div>
  );
};
export default CreateEI;
