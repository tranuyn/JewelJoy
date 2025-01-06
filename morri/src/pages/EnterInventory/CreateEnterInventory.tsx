import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import InputCpn from "./inputComponent";
import ProductForm from "./ProductForm";
import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
interface Staff {
  id: string;
  username: string;
  email: string;
  name: string;
  phoneNumber: string;
  cccd: string;
  role: string;
}
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
  weight: number;
  chiPhiPhatSinh: number;
  enteredQuantity: number;
  images: File[];
}

const CreateEI: React.FC = () => {
  const [formCount, setFormCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [inventoryStaff, setInventoryStaff] = useState<Staff[]>([]);
  const [isSupplierExist, setIsSupplierExist] = useState(false);
  const [formProductData, setProductFormData] = useState<FormProductData[]>([
    {
      id: "",
      name: "",
      code: "",
      description: "",
      material: "",
      sellingPrice: 0,
      costPrice: 0,
      imageUrl: [],
      loaiSanPham: "",
      quantity: 0,
      weight: 0,
      chiPhiPhatSinh: 0,
      enteredQuantity: 0,
      images: [],
    },
  ]);

  const [formData, setFormData] = useState({
    supplierId: "",
    supplierPhone: "",
    supplierName: "",
    supplierAddress: "",
    staffId: "",
    staffName: "",
    staffEmail: "",
    staffPhone: "",
    dateEnter: "",
    totalValue: "",
    note: "",
    name: "",
    images: [],
  });
  const hasMounted = useRef(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const removeForm = (indexToRemove: number) => {
    if (formProductData.length <= 1) return;

    setProductFormData((prevData) => {
      // Remove the form at index-1 (because form indices start at 1)
      const actualIndex = indexToRemove - 1;
      return prevData.filter((_, index) => index !== actualIndex);
    });

    setFormCount((prev) => prev - 1);
  };

  const addProductForm = () => {
    setProductFormData((prevData) => [
      ...prevData,
      {
        id: "",
        name: "",
        code: "",
        description: "",
        material: "",
        sellingPrice: 0,
        costPrice: 0,
        imageUrl: [],
        loaiSanPham: "",
        quantity: 0,
        weight: 0,
        chiPhiPhatSinh: 0,
        enteredQuantity: 1,
        images: [],
      },
    ]);
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
          formProductData={{
            id: "",
            name: "",
            code: "",
            description: "",
            material: "",
            sellingPrice: 0,
            costPrice: 0,
            imageUrl: [],
            loaiSanPham: "",
            quantity: 0,
            weight: 0,
            chiPhiPhatSinh: 0,
            enteredQuantity: 1,
            images: [],
          }} // Truyền dữ liệu cho form mới
          setProductFormData={setProductFormData}
        />
      );
    }
  }, [formCount]);
  useEffect(() => {
    console.log("Updated productForms:", formProductData);
  }, [formProductData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getStaff = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8081/user/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Staff[] = await response.json();
      const inventoryStaff = data.filter(
        (staff) => staff.role === "INVENTORY_STAFF"
      );
      setInventoryStaff(inventoryStaff);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const staffId = event.target.value;
    const staff1 = inventoryStaff.find((s) => s.id === staffId) || null;

    if (staff1) {
      setFormData((prevData) => ({
        ...prevData,
        staffId: staff1.id,
        staffName: staff1.name,
        staffEmail: staff1.email,
        staffPhone: staff1.phoneNumber, // Đảm bảo đúng tên khóa
      }));
    }
  };

  const handleReloadClick = () => {
    if (formData.supplierPhone) {
      fetchInfo(formData.supplierPhone);
    }
  };

  const fetchInfo = async (phone: string) => {
    try {
      const response = await fetch(
        `http://localhost:8081/supplier/getSupplierByPhone/${phone}`
      );
      if (!response.ok) {
        setIsSupplierExist(false);
        throw new Error("Không thể lấy dữ liệu");
      }
      const data = await response.json();
      setIsSupplierExist(true);
      setFormData((prevData) => ({
        ...prevData,
        supplierId: data.id,
        supplierPhone: data.supplierPhone,
        supplierName: data.supplierName,
        supplierAddress: data.supplierAddress,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const uploadImages = async (images: File[]) => {
    if (images.length === 0) {
      console.error("No images provided for upload.");
    }
    if (images.length > 0) {
      try {
        const uploadedUrls = await Promise.all(
          images.map(async (image) => {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "morriweb");
            formData.append("cloud_name", "dzdso60ms");
            formData.append("api_key", "112278112619619"); // API key vẫn ở trong formData

            try {
              const response = await fetch(
                "https://api.cloudinary.com/v1_1/dzdso60ms/image/upload",
                {
                  method: "POST",
                  body: formData,
                }
              );

              // Kiểm tra xem yêu cầu có thành công không
              if (!response.ok) {
                throw new Error("Upload failed");
              }

              const data = await response.json();
              console.log("Response from Cloudinary:", data.url);
              return data.secure_url; // Hoặc data.url, tùy thuộc vào cấu trúc phản hồi
            } catch (error) {
              console.error("Error uploading image:", error);
              return null; // Hoặc xử lý lỗi theo cách bạn muốn
            }
          })
        );

        return uploadedUrls;

        // Trả về mảng các URL
      } catch (error) {
        alert(error);
        throw error;
      }
    }
    return [];
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!formData.staffEmail) {
      alert(
        "Thông tin nhân viên không hợp lệ. Vui lòng điền thông tin nhân viên."
      );
      return;
    }
    if (
      !formData.supplierAddress ||
      !formData.supplierName ||
      !formData.supplierPhone
    ) {
      alert(
        "Thông tin Nhà cung cấp không hợp lệ. Vui lòng nhập đầy đủ thông tin Nhà cung cấp."
      );
      return;
    }
    setError(null);
    setOpen(true);
    await createSupplier();
    const productlist = await createProduct();
    console.log("product list", productlist);

    try {
      const response = await fetch("http://localhost:8081/inventory/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplier: formData.supplierId,
          user: formData.staffId,
          totalPrice: 10000000,
          inventoryProducts: productlist,
          name: formData.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Tạo phiếu nhập kho thất bại: " + errorData.detail);
        throw new Error("Không thể tạo ncc");
      } else alert("Tạo phiếu nhập kho thành công");
    } catch (error) {
      alert(error);
    }
    setOpen(false);
  };
  const createSupplier = async () => {
    try {
      const response = await fetch("http://localhost:8081/supplier/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierName: formData.supplierName,
          supplierPhone: formData.supplierPhone,
          supplierAddress: formData.supplierAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể tạo ncc");
      }

      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        supplierId: data.id,
      }));
      return data;
    } catch (error) {
      console.error("Error creating ncc:", error);
    }
  };

  const createProduct = async () => {
    // Khởi tạo mảng kết quả
    const mapProduct: { product: string; enteredQuantity: number }[] = [];

    // Tạo các promise để gửi tất cả các yêu cầu API song song
    const productPromises = formProductData.map(async (data) => {
      try {
        const existingProduct = await fetch(
          `http://localhost:8081/jewelry/getProductByCode/${data.code}`
        );
        if (existingProduct.ok) {
          const existingProductData = await existingProduct.json();
          // Cập nhật mảng kết quả với sản phẩm đã tồn tại
          return {
            product: existingProductData.id,
            enteredQuantity: data.enteredQuantity,
          };
        } else {
          const images = await uploadImages(data.images);
          const body = {
            name: data.name,
            code: data.code,
            description: data.description,
            material: data.material,
            sellingPrice: data.sellingPrice,
            costPrice: data.costPrice,
            imageUrl: images,
            loaiSanPham: data.loaiSanPham,
            quantity: data.enteredQuantity,
            weight: data.weight,
            chiPhiPhatSinh: data.chiPhiPhatSinh,
            supplierId: formData.supplierId,
          };
          console.log(body);

          const response = await fetch("http://localhost:8081/jewelry/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const jsonResponse = await response.json();
          console.log("Response from API:", jsonResponse);
          // Trả về kết quả cho sản phẩm mới
          return {
            product: jsonResponse.id,
            enteredQuantity: data.enteredQuantity,
          };
        }
      } catch (error) {
        console.error("Lỗi khi tạo sản phẩm:", error);
        return null; // Hoặc bạn có thể trả về giá trị mặc định hoặc xử lý lỗi tùy thích
      }
    });

    // Đợi tất cả các promise hoàn thành và loại bỏ các giá trị null nếu có lỗi
    const results = await Promise.all(productPromises);
    // Cập nhật mapProduct với các kết quả hợp lệ
    results.forEach((result) => {
      if (result) mapProduct.push(result);
    });

    return mapProduct; // Trả về kết quả sau khi tất cả sản phẩm được xử lý
  };

  return (
    <div className="enter-inventory-page">
      <div className="threeForm">
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin nhà cung cấp</div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <InputCpn
              title={
                isSupplierExist
                  ? "Số điện thoại - đã lưu"
                  : "Số điện thoại - chưa lưu (mới)"
              }
              name="supplierPhone"
              type="tel"
              placehoder="số điện thoại"
              pattern="[0-9]*"
              maxLength={10}
              value={formData.supplierPhone}
              onChange={handleInputChange}
            />
            <div
              className="CachedIconContainer1"
              onClick={() => handleReloadClick()}
            >
              <CachedIcon sx={{ color: "#08B5FA" }} />
            </div>
          </div>

          <InputCpn
            title="Tên nhà cung cấp"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleInputChange}
          />
          <InputCpn
            title="Địa chỉ nhà cung cấp"
            name="supplierAddress"
            value={formData.supplierAddress}
            onChange={handleInputChange}
          />
        </form>
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin nhân viên nhập kho</div>
          <div className="input-containerE">
            <label className="input-labelE">Họ tên nhân viên</label>
            <select
              className="input-fieldE"
              defaultValue=""
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Chọn nhân viên
              </option>
              {inventoryStaff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
          </div>

          <InputCpn
            title="Email nhân viên"
            name="emailStaff"
            value={formData.staffEmail}
            disabled={true}
          />
          <InputCpn
            title="Số điện thoại"
            name="staffPhone"
            value={formData.staffPhone}
            disabled={true}
          />
        </form>
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin phiếu nhập kho</div>
          <InputCpn
            title="Ngày nhập"
            name="dateEnter"
            type="date"
            value={formData.dateEnter}
            onChange={handleInputChange}
          />
          <InputCpn
            title="Mô tả"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputCpn
            title="Ghi chú"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className="twoForm">
        {formProductData.map((data, arrayIndex) => (
          <ProductForm
            key={`product-form-${arrayIndex}`}
            index={arrayIndex + 1}
            addProductForm={addProductForm}
            removeForm={removeForm}
            formProductData={data}
            setProductFormData={setProductFormData}
          />
        ))}
      </div>

      <div className="submit-btn">
        <div style={{ flex: 1 }}></div>
        <button
          style={{
            backgroundColor: "#2196f3",
            padding: "10px 20px",
            marginBottom: "20px",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          Thêm vào kho
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default CreateEI;
