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
    if (id !== undefined) fetchInfo(id);
    getStaff(); // Đảm bảo gọi hàm này để lấy danh sách nhân viên
  }, [id]);

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

  const handleReloadClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/supplier/getSupplierByPhone/${formData?.supplierPhone}`
      );
      if (!response.ok) {
        setIsSupplierExist(false);
        throw new Error("Không thể lấy dữ liệu");
      }
      const data = await response.json();
      setIsSupplierExist(true);
      if (data) {
        setFormData((prevData) => {
          return {
            ...prevData!,
            supplierId: data.id,
            supplierPhone: data.supplierPhone,
            supplierName: data.supplierName,
            supplierAddress: data.supplierAddress,
          };
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
      console.log(data);
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
        chiPhiPhatSinh: parseFloat(item.product.chiPhiPhatSinh),
        enteredQuantity: item.enteredQuantity,
        images: [] as File[],
      }));

      setProductFormData(mappedProductData);
      console.log("Ngay nhap kho", formData?.ngayNhapKho);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!formData) return; // Kiểm tra formData để tránh lỗi khi formData là null
    const selectedStaffId = event.target.value;

    const selectedStaff = inventoryStaff.find(
      (staff) => staff.id === selectedStaffId
    );

    if (selectedStaff) {
      setFormData((prevData) => {
        return {
          ...prevData!,
          staffId: selectedStaff.id, // Lưu ID nhân viên
          staffName: selectedStaff.name, // Lưu tên nhân viên
          staffEmail: selectedStaff.email, // Lưu email nhân viên
          staffPhoneNumber: selectedStaff.phoneNumber, // Lưu số điện thoại nhân viên
        };
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) {
      return; // Dừng lại, không tiếp tục với update
    }

    const { name, value } = event.target;

    if (name === "dateEnter") {
      // Nếu là trường ngày nhập, ta có thể xử lý nó tại đây nếu cần
      const updatedValue = value ? value + "T00:00:00.000Z" : ""; // Tạo ra chuỗi ngày hợp lệ (thêm thời gian nếu cần)
      setFormData((prevData) => {
        if (prevData === null) {
          return { ...formData, [name]: value };
        }
        return {
          ...prevData, // Giữ lại các giá trị cũ
          ngayNhapKho: updatedValue, // Cập nhật giá trị của trường cụ thể
        };
      });
    } else {
      setFormData((prevData) => {
        if (prevData === null) {
          return { ...formData, [name]: value };
        }
        return {
          ...prevData, // Giữ lại các giá trị cũ
          [name]: value, // Cập nhật giá trị của trường cụ thể
        };
      });
    }

    setFormData((prevData) => {
      // Kiểm tra xem prevData có phải là null không
      if (prevData === null) {
        return { ...formData, [name]: value };
      }
      return {
        ...prevData, // Giữ lại các giá trị cũ
        [name]: value, // Cập nhật giá trị của trường cụ thể
      };
    });
  };

  const handleUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await createSupplier();
    if (!formData?.staffEmail) {
      alert(
        "Thông tin nhân viên không hợp lệ. Vui lòng điền thông tin nhân viên."
      );
      return;
    }
    if (
      !formData?.supplierAddress ||
      !formData?.supplierName ||
      !formData?.supplierPhone
    ) {
      alert(
        "Thông tin Nhà cung cấp không hợp lệ. Vui lòng nhập đầy đủ thông tin Nhà cung cấp."
      );
      return;
    }
    setError(null);
    // setOpen(true);

    try {
      const response = await fetch(
        `http://localhost:8081/inventory/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier: formData.supplierId,
            user: formData.staffId,
            ngayNhapKho: formData.ngayNhapKho,
            name: formData.name,
            note: formData.note,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert("Cập nhật phiếu nhập kho thất bại: " + errorData.detail);
        // throw new Error("Không thể tạo ncc");
      } else alert("Cập nhật phiếu nhập kho thành công");
    } catch (error) {
      alert(error);
    }
    // setOpen(false);
  };

  const createSupplier = async () => {
    try {
      const response = await fetch("http://localhost:8081/supplier/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierName: formData?.supplierName,
          supplierPhone: formData?.supplierPhone,
          supplierAddress: formData?.supplierAddress,
        }),
      });

      if (!response.ok) {
        // throw new Error("Không thể tạo ncc");
      }

      const data = await response.json();
      setFormData((prevData) => {
        return {
          ...prevData!,
          supplierId: data.id,
        };
      });
      return data;
    } catch (error) {
      console.error("Error creating ncc:", error);
    }
  };

  return (
    <div className="enter-inventory-page">
      <div className="formTitlePP" style={{ color: "#EFB26A" }}>
        Mã phiếu nhập kho: {formData?.id || "Đang tải..."}
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
              placehoder="Số điện thoại"
              pattern="[0-9]*"
              maxLength={10}
              value={formData?.supplierPhone || ""}
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
            value={formData?.supplierName || ""}
            onChange={handleInputChange}
          />
          <InputCpn
            title="Địa chỉ nhà cung cấp"
            name="supplierAddress"
            value={formData?.supplierAddress || ""}
            onChange={handleInputChange}
          />
        </form>
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin nhân viên nhập kho</div>
          <div className="input-containerE">
            <label className="input-labelE">Họ tên nhân viên</label>
            <select
              className="input-fieldE"
              value={formData?.staffId || ""}
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
            value={formData?.staffEmail || ""}
            disabled={true}
          />
          <InputCpn
            title="Số điện thoại"
            name="staffPhone"
            value={formData?.staffPhoneNumber || ""}
            disabled={true}
          />
        </form>
        <form className="formEnterContainer">
          <div className="formTitleE">Thông tin phiếu nhập kho</div>
          <InputCpn
            title="Mô tả"
            name="name"
            type="text"
            value={formData?.name || ""}
            onChange={handleInputChange}
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
              value={
                formData?.ngayNhapKho ? formData.ngayNhapKho.split("T")[0] : ""
              }
              onChange={handleInputChange}
            />
            <InputCpn
              title="Tổng giá trị phiếu"
              type="tel"
              name="ivtrValue"
              value={formData?.totalPrice.toString() || ""}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>

          <InputCpn
            title="Ghi chú"
            name="note"
            value={formData?.note || ""}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className="twoForm">
        {formProductData.map((data, index) => (
          <ProductForm key={index} formProductData={data} />
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
          onClick={handleUpdate}
        >
          Cập nhật
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ViewOrEdit;
