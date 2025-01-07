import React, { useState, useEffect } from "react";
import "./style.css";
import InputCpn from "../EnterInventory/inputComponent";
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
  status: string;
  imageUrl: string[];
  loaiSanPham: string;
  quantity: number;
  enteredQuantity: number;
  weight: number;
  chiPhiPhatSinh: number;
  images: File[];
}

interface ProductFormProps {
  data: FormProductData; // Nhận dữ liệu từ cha
  setData: React.Dispatch<React.SetStateAction<FormProductData[]>>;
}

const ProductForm: React.FC<ProductFormProps> = ({ data, setData }) => {
  const [isExist, setIsExist] = useState(false);
  const [formData, setFormData] = useState<FormProductData>({
    id: data.id || "",
    name: data.name || "",
    code: data.code || "",
    description: data.description || "",
    material: data.material || "",
    sellingPrice: data.sellingPrice || 0,
    costPrice: data.costPrice || 0,
    status: data.status || "",
    imageUrl: data.imageUrl || [],
    loaiSanPham: data.loaiSanPham || "",
    quantity: data.quantity || 0,
    enteredQuantity: data.enteredQuantity || 0,
    weight: data.weight || 0,
    chiPhiPhatSinh: data.chiPhiPhatSinh || 0,
    images: data.images || [],
  });

  const [imagestemp, setImagestemp] = useState<string[]>([]);

  useEffect(() => {
    setFormData(data); // Cập nhật khi dữ liệu từ cha thay đổi
  }, [data]);

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

    // setProductFormData((prevData) => {
    //   const newData = [...prevData];
    //   newData[index - 1] = {
    //     ...newData[index - 1],
    //     [name]: value,
    //   };
    //   return newData;
    // });
  };
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      const newImages = [...imagestemp];
      newImages[imageIndex] = dataUrl;
      setImagestemp(newImages);

      // Update the form data with new images array
      // setProductFormData((prevData) => {
      //   const newData = [...prevData];
      //   const currentImages = newData[index - 1].images || []; // Lấy mảng hình ảnh hiện tại

      //   // Cập nhật mảng hình ảnh
      //   newData[index - 1] = {
      //     ...newData[index - 1],
      //     images: [...currentImages, file], // Thêm file vào mảng images
      //   };
      //   return newData;
      // });
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
    // setProductFormData((prevData) => {
    //   const newData = [...prevData];
    //   const currentImages = newData[index - 1].images || []; // Lấy mảng hình ảnh hiện tại

    //   // Cập nhật mảng hình ảnh
    //   newData[index - 1] = {
    //     ...newData[index - 1],
    //     images: currentImages.filter((_, idx) => idx !== imageIndex), // Lọc ra hình ảnh không cần thiết
    //   };
    //   return newData;
    // });
  };
  return (
    <form className="formEnterContainer">
      <InputCpn
        title="Tên sản phẩm"
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
          value={formData?.weight?.toString() || ""}
          onChange={handleInputChange}
          type="number"
        />
        <InputCpn
          title="Giá nhập"
          name="costPrice"
          value={formData?.costPrice?.toString() || ""}
          type="number"
          onChange={handleInputChange}
        />
        <InputCpn
          title="Giá bán"
          name="sellingPrice"
          value={formData?.sellingPrice.toString() || ""}
          type="number"
          onChange={handleInputChange}
        />
        <InputCpn
          title="Chi phí phát sinh"
          name="chiPhiPhatSinh"
          type="number"
          value={formData?.chiPhiPhatSinh.toString() || ""}
          onChange={handleInputChange}
        />
        <InputCpn
          title="số lượng đang có"
          name="quantity"
          value={formData?.quantity.toString() || ""}
          type="tel"
          onChange={handleInputChange}
        />
        <div className="input-containerE">
          <label className="input-labelE">Trạng thái</label>
          <select
            className="input-fieldE"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="available">Đang bán</option>
            <option value="unavaible">Ngừng bán</option>
          </select>
        </div>
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
      <div className="fiveForm">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="input-containerE">
            <input
              type="file"
              accept="image/*"
              className="img-inputp"
              onChange={(e) => handleImageChange(e, index)}
            />
            {formData.imageUrl[index] && (
              <div className="img-container">
                <img
                  src={formData.imageUrl[index] || ""}
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
