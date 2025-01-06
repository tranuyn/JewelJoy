import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import InputCpn from "../inputComponent";
import ProductForm from "./productForm";
import CachedIcon from "@mui/icons-material/Cached";
import { useParams } from "react-router-dom";
import axios from "axios";
interface Staff {
  id: string;
  username: string;
  email: string;
  name: string;
  phoneNumber: string;
  cccd: string;
  role: string;
}

interface FormData {
  id: string;
  name: string;
  quantity: number;
  supplierId: string;
  supplierName: string;
  supplierAddress: string;
  supplierPhone: string;
  staffId: string;
  staffUsername: string;
  staffEmail: string;
  staffName: string;
  staffPhoneNumber: string;
  cccd: string;
  ngayNhapKho: string;
  totalPrice: number;
  note: string;
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

const ViewOrEdit: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [inventoryStaff, setInventoryStaff] = useState<Staff[]>([]);
  const [isSupplierExist, setIsSupplierExist] = useState(false);
  const [formProductData, setProductFormData] = useState<FormProductData[]>([]);
  const [canEdit, setCanEdit] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (id != undefined) fetchInfo(id);
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // const { name, value } = event.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const staffId = event.target.value;
    const staff1 = inventoryStaff.find((s) => s.id === staffId) || null;

    // if (staff1) {
    //    if (formData != null)
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     staffId: staff1.id,
    //     staffName: staff1.name,
    //     staffEmail: staff1.email,
    //     staffPhone: staff1.phoneNumber, // Đảm bảo đúng tên khóa
    //   }));
    // }
  };

  const handleReloadClick = () => {
    if (formData?.supplierPhone) {
      fetchInfo(formData?.supplierPhone);
    }
  };

  const fetchInfo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8081/inventory/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu");
      }
      const data = await response.json();
      setFormData({
        id: data.id,
        name: data.name,
        quantity: data.quantity,
        supplierId: data.supplier.id,
        supplierName: data.supplier.supplierName,
        supplierAddress: data.supplier.supplierAddress,
        supplierPhone: data.supplier.supplierPhone,
        staffId: data.user.id,
        staffUsername: data.user.username,
        staffEmail: data.user.email,
        staffName: data.user.name,
        staffPhoneNumber: data.user.phoneNumber,
        cccd: data.user.cccd,
        ngayNhapKho: data.ngayNhapKho,
        totalPrice: data.totalPrice,
        note: data.note,
      });
      const mappedProductData = data.inventoryProducts.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        code: item.product.code,
        description: item.product.description,
        material: item.product.material,
        sellingPrice: item.product.sellingPrice,
        costPrice: item.product.costPrice,
        imageUrl: item.product.imageUrl,
        loaiSanPham: item.product.loaiSanPham,
        quantity: item.product.quantity,
        weight: item.product.weight,
        chiPhiPhatSinh: parseFloat(item.product.chiPhiPhatSinh), // Ensure it's a number
        enteredQuantity: item.enteredQuantity,
        images: [] as File[], // Set to an empty array or populate it as needed
      }));

      setProductFormData(mappedProductData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className="enter-inventory-page">
      <div className="formTitlePP" style={{ color: "#EFB26A" }}>
        Mã phiếu nhập kho: {formData?.id}
      </div>
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
              value={formData?.supplierPhone}
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
            value={formData?.supplierName}
            onChange={handleInputChange}
          />
          <InputCpn
            title="Địa chỉ nhà cung cấp"
            name="supplierAddress"
            value={formData?.supplierAddress}
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
            value={formData?.staffEmail}
            disabled={true}
          />
          <InputCpn
            title="Số điện thoại"
            name="staffPhone"
            value={formData?.staffPhoneNumber}
            disabled={true}
          />
        </form>
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin phiếu nhập kho</div>
          <InputCpn
            title="Mô tả"
            name="name"
            type="text"
            value={formData?.name}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <InputCpn
              title="Ngày nhập"
              name="dateEnter"
              type="date"
              value={formData?.ngayNhapKho}
            />

            <InputCpn
              title="Tổng giá trị phiếu"
              type="tel"
              name="ivtrValue"
              value={formData?.totalPrice.toString()}
            />
          </div>

          <InputCpn title="Ghi chú" name="note" value={formData?.note} />
        </form>
      </div>

      <div className="twoForm">
        {formProductData.map((data, arrayIndex) => (
          <ProductForm formProductData={data} />
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
          //   onClick={handleSubmit}
        >
          Cập nhật
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
export default ViewOrEdit;
