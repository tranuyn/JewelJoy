import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import InputCpn from "./inputComponent";
import ProductForm from "./ProductForm";
const CreateEI: React.FC = () => {
  const [formCount, setFormCount] = useState<number>(1);
  const [productForms, setProductForms] = useState<JSX.Element[]>([]);
  const hasMounted = useRef(false);
  const removeForm = (index: number) => {
    if (productForms.length === 0) return;
    setProductForms((prevForms) => {
      const updatedForms = prevForms.filter(
        (form) => form.props.index !== index
      );
      return updatedForms;
    });
  };

  const addProductForm = () => {
    setFormCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true; // Set to true after first render
    } else {
      const newForm = (
        <ProductForm
          index={formCount}
          key={formCount}
          addProductForm={addProductForm}
          removeForm={removeForm}
        />
      );
      setProductForms((prevForms) => [...prevForms, newForm]);
    }
    console.log(productForms);
  }, [formCount]);
  useEffect(() => {
    console.log("Updated productForms:", productForms);
  }, [productForms]);

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
