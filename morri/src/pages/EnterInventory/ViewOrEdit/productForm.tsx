import React, { useState, useEffect } from "react";
import "../style.css";
import InputCpn from "../inputComponent";

interface FormProductData {
  id: string;
  name: string;
  code: string;
  description: string;
  material: string;
  sellingPrice: number;
  costPrice: number;
  imageUrl: string[];
  loaiSanPham: string;
  quantity: number;
  enteredQuantity: number;
  weight: number;
  chiPhiPhatSinh: number;
  images: File[];
}

interface ProductFormProps {
  formProductData: FormProductData; // Nhận dữ liệu từ cha
}

const ProductForm: React.FC<ProductFormProps> = ({ formProductData }) => {
  const [formData, setFormData] = useState<FormProductData>(formProductData);

  useEffect(() => {
    setFormData(formProductData); // Cập nhật khi dữ liệu từ cha thay đổi
  }, [formProductData]);

  return (
    <form className="formEnterContainer" style={{ marginTop: "20px" }}>
      <div className="formTitlePP">Thông tin sản phẩm</div>

      <div style={{ width: "100%" }}>
        <InputCpn
          title="Tên sản phẩm"
          name="name"
          value={formData.name}
          disabled={true}
        />
      </div>

      <div className="threeForm" style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <InputCpn
            title="Mã sản phẩm"
            name="code"
            value={formData.code}
            disabled={true}
          />
        </div>

        <div className="input-containerE">
          <label className="input-labelE">Loại sản phẩm</label>
          <select
            className="input-fieldE"
            name="loaiSanPham"
            value={formData.loaiSanPham}
            disabled={true}
          >
            <option value="BONGTAI">Bông tai</option>
            <option value="DAYCHUYEN">Dây chuyền</option>
            <option value="VONGTAY">Vòng tay</option>
            <option value="NHAN">Nhẫn</option>
            <option value="DAQUY">Đá quý</option>
            <option value="KIMCUONG">Kim cương</option>
            <option value="THACH">Thạch</option>
            <option value="NGOC">Ngọc</option>
          </select>
        </div>

        <div className="input-containerE">
          <label className="input-labelE">Nguyên liệu</label>
          <select
            className="input-fieldE"
            defaultValue=""
            value={formData.material}
            name="material"
            disabled={true}
          >
            <option value="Vàng">Vàng</option>
            <option value="Bạc">Bạc</option>
            <option value="Kim cương">Kim cương</option>
            <option value="Bạch kim">Bạch kim</option>
          </select>
        </div>
        <InputCpn
          title="Khối lượng"
          name="weight"
          value={formData.weight.toString()}
          disabled={true}
          type="number"
        />
        <InputCpn
          title="Giá nhập"
          name="costPrice"
          value={formData.costPrice.toString()}
          type="number"
          disabled={true}
        />
        <InputCpn
          title="Giá bán"
          name="sellingPrice"
          value={formData.sellingPrice.toString()}
          type="number"
          disabled={true}
        />
        <InputCpn
          title="Chi phí phát sinh"
          name="chiPhiPhatSinh"
          type="number"
          value={formData.chiPhiPhatSinh.toString()}
          disabled={true}
        />
        <InputCpn
          title="số lượng đang có"
          name="quantity"
          value={formData.quantity.toString()}
          type="tel"
          disabled={true}
        />
        <InputCpn
          title="số lượng nhập"
          name="enterdQuantity"
          value={formData.enteredQuantity.toString()}
          type="tel"
          disabled={true}
        />
      </div>

      <div className="input-containerE">
        <label className="input-labelE">Mô tả sản phẩm</label>
        <textarea
          name="description"
          value={formData.description}
          className="input-fieldE"
          style={{ maxWidth: "100%", height: "200px" }}
          disabled={true}
        />
      </div>

      <div className="fiveForm">
        {formData.imageUrl.map((_, index) => (
          <div key={index} className="input-containerE">
            {formData.imageUrl[index] && (
              <div className="img-container">
                <img
                  src={formData.imageUrl[index]}
                  alt={`Selected preview ${index}`}
                  className="img-preview"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};
export default ProductForm;
