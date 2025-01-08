import React, { useState, useEffect } from "react";
import "../ProductDetail/style.css";
import InputCpn from "../EnterInventory/inputComponent";
import { uploadImages } from "../../services/cloudinaryService";

interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  material: string;
  sellingPrice: number;
  costPrice: number;
  status: string;
  imageUrl: (string | null)[];
  loaiSanPham: string;
  quantity: number;
  weight: number;
  chiPhiPhatSinh: number;
  images: (File | null)[];
}

interface ProductFormProps {
  data: Product | null;
  setData: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

const ProductForm: React.FC<ProductFormProps> = ({ data, setData }) => {
  const [isExist, setIsExist] = useState(false);
  const [previewImages, setPreviewImages] = useState<(string | null)[]>(
    data?.imageUrl || []
  );
  const [formData, setFormData] = useState<Product | null>({
    id: data?.id || "",
    name: data?.name || "",
    code: data?.code || "",
    description: data?.description || "",
    material: data?.material || "",
    sellingPrice: data?.sellingPrice || 0,
    costPrice: data?.costPrice || 0,
    status: data?.status || "",
    imageUrl: data?.imageUrl || [],
    loaiSanPham: data?.loaiSanPham || "",
    quantity: data?.quantity || 0,
    weight: data?.weight || 0,
    chiPhiPhatSinh: data?.chiPhiPhatSinh || 0,
    images: data?.images || [],
  });

  useEffect(() => {
    console.log(data);
    setFormData(data);
    setPreviewImages(data?.imageUrl || []);
  }, [data]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData!,
        [name]: value,
      };
    });
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);

      // Cập nhật preview images
      const newPreviewImages = [...previewImages];
      newPreviewImages[imageIndex] = dataUrl;
      setPreviewImages(newPreviewImages);

      // Cập nhật formData.images để lưu file mới
      const newImages = [...(formData?.images || [])];
      newImages[imageIndex] = file;

      setFormData((prev) => {
        return {
          ...prev!,
          images: newImages,
          imageUrl: newPreviewImages,
        };
      });
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

    // Xóa ảnh khỏi preview
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(imageIndex, 1);
    newPreviewImages.push(null); // Thêm null vào cuối để giữ số lượng slot
    setPreviewImages(newPreviewImages);

    // Cập nhật formData
    const newImages = [...(formData?.images || [])];
    newImages.splice(imageIndex, 1);
    newImages.push(null);
    setFormData((prevData) => {
      return {
        ...prevData!,
        images: newImages,
        imageUrl: newPreviewImages,
      };
    });
  };

  const uploadImageToUpdate1 = async (
    previewImages: (string | null)[]
  ): Promise<string[]> => {
    const uploadedUrls = await Promise.all(
      previewImages.map(async (image) => {
        if (!image) return null;

        if (image.startsWith("http://") || image.startsWith("https://")) {
          return image;
        }
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });

          const uploadedUrl = await uploadImages(file);
          console.log("Response image" + uploadedUrl);
          return uploadedUrl;
        } catch (error) {
          console.error("Error uploading image:", error);
          return null;
        }
      })
    );

    // Lọc bỏ các giá trị null và trả về mảng URL
    return uploadedUrls.filter((url): url is string => url !== null);
  };

  const updateProduct = async () => {
    const new_imageUrl = await uploadImageToUpdate1(previewImages);
    console.log("hehe");
    const body = {
      name: formData?.name,
      code: formData?.code,
      description: formData?.description,
      material: formData?.material,
      sellingPrice: formData?.sellingPrice,
      costPrice: formData?.costPrice,
      imageUrl: new_imageUrl,
      loaiSanPham: formData?.loaiSanPham,
      weight: formData?.weight,
      chiPhiPhatSinh: formData?.chiPhiPhatSinh,
    };
    console.log(body);

    const response = await fetch(
      `http://localhost:8081/jewelry/update/${formData?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const jsonResponse = await response.json();
    if (response.status === 200) {
      setData((prevData) => ({
        ...prevData,
        imageUrl: jsonResponse.data.imageUrl.filter(
          (url: string | null) => url !== null
        ) as string[], // Lọc bỏ null
        ...jsonResponse.data,
      }));
      alert("Cập nhật sản phẩm thành công!");
      // setFormData(data);
    } else alert("Cập nhật sản phẩm thất bại : " + response.status);
    console.log("Response from API:", jsonResponse);
  };

  return (
    <form className="formEnterContainer">
      <InputCpn
        title="Tên sản phẩm"
        name="name"
        value={formData?.name}
        onChange={handleInputChange}
      />
      <div className="threeForm" style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <InputCpn
            title="Mã sản phẩm"
            name="code"
            value={formData?.code}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-containerE">
          <label className="input-labelE">Loại sản phẩm</label>
          <select
            className="input-fieldE"
            name="loaiSanPham"
            value={formData?.loaiSanPham}
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
            value={formData?.material}
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
            value={formData?.status}
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
          value={formData?.description}
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
            {previewImages[index] && (
              <div className="img-container">
                <img
                  src={previewImages[index] || ""}
                  alt={`Selected preview ${index}`}
                  className="img-preview"
                />
                <div className="delete-overlay">
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteImage(e, index)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="editbutoon"
        onClick={(e) => {
          e.preventDefault(); // Prevents the default form submission behavior
          updateProduct(); // Call your upload function
        }}
      >
        Cập nhật
      </button>
    </form>
  );
};
export default ProductForm;
