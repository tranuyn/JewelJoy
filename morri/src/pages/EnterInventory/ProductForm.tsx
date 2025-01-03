import React, { useState, useEffect } from "react";
import "./style.css";
import InputCpn from "./inputComponent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CachedIcon from "@mui/icons-material/Cached";

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
}

interface ProductFormProps {
  index: number;
  addProductForm: () => void;
  removeForm: (index: number) => void;
  formProductData: FormProductData; // Nhận dữ liệu từ cha
  setProductFormData: React.Dispatch<React.SetStateAction<FormProductData[]>>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  index,
  addProductForm,
  removeForm,
  formProductData,
  setProductFormData,
}) => {
  const [isExist, setIsExist] = useState(false);
  const [formData, setFormData] = useState<FormProductData>(formProductData);

  useEffect(() => {
    setFormData(formProductData); // Cập nhật khi dữ liệu từ cha thay đổi
  }, [formProductData]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setProductFormData((prevData) => {
      const newData = [...prevData];
      newData[index - 1] = {
        ...newData[index - 1],
        [name]: value,
      };
      return newData;
    });
  };

  const handleReloadClick = () => {
    if (formData.code) {
      fetchInfo(formData.code);
    }
  };

  const fetchInfo = async (code: string) => {
    try {
      const response = await fetch(
        `http://localhost:8081/jewelry/getProductByCode/${code}`
      );
      if (!response.ok) {
        setIsExist(false);
        throw new Error("Không thể lấy dữ liệu");
      }
      const data = await response.json();
      setIsExist(true);
      setFormData((prevData) => ({
        ...prevData,
        id: data.id,
        name: data.name,
        code: data.code,
        description: data.description,
        material: data.material,
        sellingPrice: data.sellingPrice,
        costPrice: data.costPrice,
        imageUrl: data.imageUrl,
        quantity: data.quantity,
        loaiSanPham: data.loaiSanPham,
        weight: data.weight,
        chiPhiPhatSinh: data.chiPhiPhatSinh,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

      <InputCpn
        title={
          isExist
            ? "Tên sản phẩm - đã lưu"
            : "Tên sản phẩm (có kèm mã sản phẩm)"
        }
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <div className="threeForm" style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <InputCpn
            title="Mã sản phẩm"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
          />
          <div
            className="CachedIconContainer1"
            onClick={() => handleReloadClick()}
          >
            <CachedIcon sx={{ color: "#08B5FA" }} />
          </div>
        </div>

        <div className="input-containerE">
          <label className="input-labelE">Loại sản phẩm</label>
          <select
            className="input-fieldE"
            defaultValue=""
            name="loaiSanPham"
            value={formData.loaiSanPham}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
          onChange={handleInputChange}
          type="number"
        />
        <InputCpn
          title="Giá nhập"
          name="costPrice"
          value={formData.costPrice.toString()}
          type="number"
        />
        <InputCpn
          title="Giá bán"
          name="sellingPrice"
          value={formData.sellingPrice.toString()}
          type="number"
        />
        <InputCpn
          title="Chi phí phát sinh"
          name="chiPhiPhatSinh"
          type="number"
          value={formData.chiPhiPhatSinh.toString()}
        />
        <InputCpn
          title="số lượng đang có"
          name="quantity"
          value={formData.quantity.toString()}
          type="tel"
        />
        <InputCpn
          title="số lượng nhập"
          name="enterdQuantity"
          value={formData.enteredQuantity.toString()}
          type="tel"
        />
      </div>

      <div className="input-containerE">
        <label className="input-labelE">Mô tả sản phẩm</label>
        <textarea
          name="description"
          value={formData.description}
          className="input-fieldE"
          style={{ maxWidth: "100%" }}
          onChange={handleInputChange}
        />
      </div>

      {isExist ? (
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
      ) : (
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
      )}
    </form>
  );
};
export default ProductForm;
