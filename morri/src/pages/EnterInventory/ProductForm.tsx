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
  images: File[];
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
  const [imagestemp, setImagestemp] = useState<string[]>([]);

  useEffect(() => {
    // Chỉ cập nhật formData khi formProductData thay đổi, nhưng giữ lại dữ liệu người dùng nhập
    setFormData((prevData) => ({
      ...prevData,
      ...formProductData,
    }));
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
        setFormData((prevData) => ({
          ...prevData,
          id: "",
        }));

        throw new Error("Không thể lấy dữ liệu");
      }
      const data = await response.json();
      setIsExist(true);
      setFormData((prevData) => ({
        ...prevData,
        id: data.id || prevData.id, // Giữ lại ID cũ nếu không có
        name: data.name || prevData.name,
        code: data.code || prevData.code,
        description: data.description || prevData.description,
        material: data.material || prevData.material,
        sellingPrice: data.sellingPrice || prevData.sellingPrice,
        costPrice: data.costPrice || prevData.costPrice,
        imageUrl: data.imageUrl || prevData.imageUrl,
        quantity: data.quantity || prevData.quantity,
        loaiSanPham: data.loaiSanPham || prevData.loaiSanPham,
        weight: data.weight || prevData.weight,
        chiPhiPhatSinh: data.chiPhiPhatSinh || prevData.chiPhiPhatSinh,
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

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        const newImages = [...imagestemp];
        newImages[imageIndex] = dataUrl;
        setImagestemp(newImages);

        // Update the form data with new images array
        setProductFormData((prevData) => {
          const newData = [...prevData];
          const currentImages = newData[index - 1].images || []; // Lấy mảng hình ảnh hiện tại

          // Cập nhật mảng hình ảnh
          newData[index - 1] = {
            ...newData[index - 1],
            images: [...currentImages, file], // Thêm file vào mảng images
          };
          return newData;
        });
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    imageIndex: number
  ) => {
    e.preventDefault();
    const newImages = [...imagestemp];
    newImages.splice(imageIndex, 1); // Remove image at imageIndex
    setImagestemp(newImages);

    // Update the form data with new images array
    setProductFormData((prevData) => {
      const newData = [...prevData];
      const currentImages = newData[index - 1].images || []; // Lấy mảng hình ảnh hiện tại

      // Cập nhật mảng hình ảnh
      newData[index - 1] = {
        ...newData[index - 1],
        images: currentImages.filter((_, idx) => idx !== imageIndex), // Lọc ra hình ảnh không cần thiết
      };
      return newData;
    });
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
          onChange={handleInputChange}
        />
        <InputCpn
          title="Giá bán"
          name="sellingPrice"
          value={formData.sellingPrice.toString()}
          type="number"
          onChange={handleInputChange}
        />
        <InputCpn
          title="Chi phí phát sinh"
          name="chiPhiPhatSinh"
          type="number"
          value={formData.chiPhiPhatSinh.toString()}
          onChange={handleInputChange}
        />
        <InputCpn
          title="số lượng đang có"
          name="quantity"
          value={formData.quantity.toString()}
          type="tel"
          onChange={handleInputChange}
        />
        <InputCpn
          title="số lượng nhập"
          name="enteredQuantity"
          value={formData.enteredQuantity.toString()}
          type="tel"
          onChange={handleInputChange}
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
              {imagestemp[index] && (
                <div className="img-container">
                  <img
                    src={imagestemp[index]}
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
