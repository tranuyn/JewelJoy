import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Bill from "./Bill";
import { Console } from "console";
import { useAuth } from "../../services/useAuth";

interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[];
  quantityInBill: number;
  loaiSanPham: string;
}

interface LocationState {
  selectedProducts: ProductType[];
  quantities: Record<string, number>;
}

const CheckOutSuccess = () => {
  const location = useLocation(); // Explicitly type the location
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>(
    location.state?.selectedProducts || [] // Fallback to an empty array if state is undefined
  );
  const [customerInfo, setCustomerInfo] = useState<Record<string, string>>(
    location.state?.customerInfo || {} // Fallback to an empty object if state is undefined
  );

  const [staffInfo, setStaffInfo] = useState<Record<string, string>>(
    location.state?.staffInfo || {} // Fallback to an empty object if state is undefined
  );

  const { user } = useAuth();

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setSelectedProducts(location.state.selectedProducts);
      setCustomerInfo(location.state.customerInfo);
      setStaffInfo(location.state.staffInfo);
    }
  }, [location.state]);

  function formatPrice(price: number): string {
    if (isNaN(price)) {
      return "0"; // Trả về "0" nếu giá trị không hợp lệ
    }

    // Chuyển giá trị thành chuỗi và chia thành các nhóm 3 chữ số
    return price
      .toString() // Chuyển thành chuỗi
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm sau mỗi 3 chữ số
  }

  function formatDate(dateString: string) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const date = new Date(dateString);

    // Lấy ngày, tháng và năm
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo ngày có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cộng thêm 1
    const year = date.getFullYear();

    // Trả về chuỗi ngày theo định dạng "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  }

  return (
    <div
      style={{
        // height: "100%",
        padding: "20px 20px",
        position: "relative",
      }}
    >
      <div
        style={{
          color: "#4ECB71",
          fontSize: "25px",
          fontWeight: "600",

          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CheckCircleIcon sx={{ color: "#4ECB71", marginRight: "10px" }} />
        <p>Đặt hàng thành công</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            ...(user?.role === "CUSTOMER"
              ? {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }
              : {}),
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "600",
            }}
          >
            <PersonOutlineIcon sx={{ color: "#EFB26A", marginRight: "8px" }} />
            Thông tin khách hàng
          </p>
          <p>Số điện thoại: {customerInfo.phoneNumber}</p>
          <p>Họ và tên: {customerInfo.name}</p>
          <p>
            Giới tính:{" "}
            {customerInfo?.gioiTinh === "MALE"
              ? "Nam"
              : customerInfo?.gioiTinh === "FEMALE"
              ? "Nữ"
              : "Không có dữ liệu"}
          </p>
          <p>Ngày sinh: {formatDate(customerInfo.dateOfBirth)}</p>
        </div>
        {user?.role != "CUSTOMER" && (
          <div>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
              }}
            >
              <PersonOutlineIcon
                sx={{ color: "#EFB26A", marginRight: "8px" }}
              />
              Thông tin nhân viên
            </p>
            <p>Họ và tên: {staffInfo.name}</p>
            <p>Email: {staffInfo.email}</p>
            <p>Số điện thoại: {staffInfo.phoneNumber}</p>
            <p>
              Giới tính:{" "}
              {staffInfo?.gender === "MALE"
                ? "Nam"
                : staffInfo?.gender === "FEMALE"
                ? "Nữ"
                : "Không có dữ liệu"}
            </p>
            <p>CCCD/CMND: {staffInfo.cccd}</p>
          </div>
        )}
      </div>

      {selectedProducts.map((product) => (
        <div key={product.id} className="billItemContainerCheckout">
          <img
            src={product.imageUrl[0]}
            style={{ width: 100, height: 100, marginRight: "20px" }}
          />
          <div
            style={{
              height: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              className="billItemContainerCheckout"
              style={{ border: "none", padding: 0 }}
            >
              <div className="billItemNameCheckout">{product.name}</div>
            </div>

            <div style={{ color: "#000", marginLeft: "10px" }}>
              đ {formatPrice(product.sellingPrice)}
            </div>

            <div style={{ marginLeft: "10px" }}>
              số lượng: {product.quantityInBill}
            </div>

            <div className="billItemPriceCheckout">
              Tổng: {formatPrice(product.sellingPrice * product.quantityInBill)}
            </div>
          </div>
        </div>
      ))}

      <div
        className="totalCheckout"
        style={{ backgroundColor: "#F0F7FD", margin: "20px 0px" }}
      >
        <div style={{ fontWeight: 600, fontSize: "18px" }}>Tổng đơn hàng:</div>
        <div
          className="billItemPriceCheckout"
          style={{ fontSize: "18px", color: "#F92121" }}
        >
          {formatPrice(
            selectedProducts.reduce((total, product) => {
              return total + product.sellingPrice * product.quantityInBill;
            }, 0)
          )}{" "}
          VND
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ marginRight: "30px" }}>
          <p>Ngày đặt hàng: {new Date().toLocaleString()}</p>
          <p>Mã phiếu: {location.state?.orderId}</p>
        </div>
        <div>
          <p>Phương thức thanh toán: {location.state?.selectedButton}</p>
          <p>Ghi chú đơn hàng: {location.state?.note}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOutSuccess;
