import React, { useState, useEffect } from "react";
import "./style.css";
import InputCpn from "./inputComponent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
interface ProductFormProps {
  index: number;
  addProductForm: () => void;
  removeForm: (index: number) => void;
}
const ProductForm: React.FC<ProductFormProps> = ({
  index,
  addProductForm,
  removeForm,
}) => {
  const handleAddForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Ngừng hành động mặc định (reload trang)
    addProductForm(); // Gọi hàm để thêm form mới
  };
  const handleDeleteForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("index in form: " + index);
    removeForm(index);
  };
  const [images, setImages] = useState<string[]>([]);
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]; // Lấy file đã chọn
    if (file) {
      const newImages = [...images];
      const reader = new FileReader();

      reader.onloadend = () => {
        newImages[index] = reader.result as string; // Đảm bảo kiểu dữ liệu là string (Data URL)
        setImages(newImages);
      };

      reader.readAsDataURL(file); // Đọc file và chuyển thành Data URL
    }
  };
  const handleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 1); // Xóa 1 ảnh tại vị trí index
    setImages(newImages);
  };

  return (
    <form className="formEnterContainer" style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <button onClick={(e) => handleAddForm(e)} className="designbth">
          <AddCircleOutlineIcon sx={{ color: "#FFA629" }} />
        </button>
        <div className="formTitleP">Thông tin sản phẩm</div>
        <button onClick={(e) => handleDeleteForm(e)} className="designbth">
          <RemoveCircleOutlineIcon sx={{ color: "#F24822" }} />
        </button>
      </div>

      <InputCpn title="Tên sản phẩm (có kèm mã sản phẩm)" name="productName" />
      <div className="threeForm" style={{ width: "100%" }}>
        <InputCpn title="Mã sản phẩm" name="productCode" />
        <div className="input-containerE">
          <label className="input-labelE">Loại sản phẩm</label>
          <select className="input-fieldE" defaultValue="">
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
          <select className="input-fieldE" defaultValue="">
            <option value="Vàng">Vàng</option>
            <option value="Bạc">Bạc</option>
            <option value="Kim cương">Kim cương</option>
            <option value="Bạch kim">Bạch kim</option>
          </select>
        </div>
        <InputCpn title="Khối lượng" name="productWeight" type="number" />
        <InputCpn title="Giá nhập" name="productCost" type="number" />
        <InputCpn title="Giá bán" name="productPrice" type="number" />
        <InputCpn
          title="Chi phí phát sinh"
          name="productMorePrice"
          type="number"
        />
        <InputCpn title="số lượng nhập" name="productQuantity" type="tel" />
      </div>

      <div className="input-containerE">
        <label className="input-labelE">Mô tả sản phẩm</label>
        <textarea className="input-fieldE" style={{ maxWidth: "100%" }} />
      </div>

      <div className="fiveForm">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="input-containerE">
            <input
              type="file"
              accept="image/*"
              className="img-inputp"
              onChange={(e) => handleImageChange(e, index)}
            />
            {images[index] && (
              <div className="img-container">
                <img
                  src={images[index]}
                  alt={`Selected preview ${index}`}
                  className="img-preview"
                />
                <div className="delete-overlay">
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      handleDeleteImage(e, index);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};
export default ProductForm;
