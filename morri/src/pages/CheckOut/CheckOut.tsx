import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import Alert from "@mui/material/Alert";
import CustomerSection from "./CustomerSection";
import StaffSection from "./StaffSection";
import Bill from "./Bill";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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

const Checkout = () => {
  const location = useLocation(); // Explicitly type the location
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>(
    location.state?.selectedProducts || [] // Fallback to an empty array if state is undefined
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(
    location.state?.quantities || {} // Fallback to an empty object if state is undefined
  );
  const [staffInfo, setStaffInfo] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      setSelectedProducts(location.state.selectedProducts);
      setQuantities(location.state.quantities);
    }
  }, [location.state]);
  const handleSetCustomerInfo = (info: any) => {
    setCustomerInfo(info);
  };

  const handleBuyNow = async (updatedProducts: ProductType[]) => {
    if (!staffInfo) {
      setError(
        "Thông tin nhân viên không hợp lệ. Vui lòng tải lại thông tin nhân viên."
      );
      return;
    }
    if (
      !customerInfo.phoneNumber ||
      !customerInfo.name ||
      !customerInfo.gioiTinh ||
      !customerInfo.dateOfBirth
    ) {
      setError(
        "Thông tin khách hàng không hợp lệ. Vui lòng nhập đầy đủ thông tin khách hàng."
      );
      console.log("indfo" + customerInfo.name);
      return;
    }
    setError(null);
    setSelectedProducts(updatedProducts);
    await createCustomer();
    createOrder(customerInfo.id);
  };

  const createCustomer = async () => {
    try {
      const dateOfBirth = customerInfo.dateOfBirth
        ? new Date(customerInfo.dateOfBirth).toISOString().split("T")[0]
        : "";
      const response = await fetch("http://localhost:8081/customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: customerInfo.phoneNumber,
          name: customerInfo.name,
          gioiTinh: customerInfo.gioiTinh,
          dateOfBirth: dateOfBirth,
        }),
      });

      if (!response.ok) {
        console.log("tạo customer thất bại");
        throw new Error("Không thể tạo khách hàng");
      }

      const data = await response.json();
      console.log(JSON.stringify(data));
      setCustomerInfo({
        phoneNumber: data.phoneNumber,
        name: data.name,
        gioiTinh: data.gioiTinh,
        dateOfBirth: customerInfo.dateOfBirth,
        id: data.id,
      });
      return data;
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const createOrder = async (phone: string) => {
    try {
      const body = {
        staff: staffInfo.id,
        createAt: new Date().toISOString(),
        customer: customerInfo.id,
        orderDetails: selectedProducts.map((product) => ({
          product: product.id,
          quantity: product.quantityInBill,
          unitPrice: product.sellingPrice,
          subtotal: product.sellingPrice * product.quantityInBill,
        })),
        paymentMethod: selectedButton,
        status: "COMPLETED",
        note: note,
        totalPrice: selectedProducts.reduce(
          (total, product) =>
            total + product.sellingPrice * product.quantityInBill,
          0
        ),
      };

      console.log(body);

      const response = await fetch("http://localhost:8081/billBan/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Tạo đơn hàng thất bại: " + errorData.detail);
        throw new Error("Không thể tạo đơn hàng");
      }

      const data = await response.json();

      navigate(`/products/checkout/${data.id}`, {
        state: {
          selectedProducts,
          customerInfo,
          staffInfo,
          note: note,
          orderId: data.id,
          selectedButton: selectedButton,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F9FCFF",
        // height: "100%",
        padding: "20px 0px",
        position: "relative",
      }}
    >
      {error != null && (
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="error"
          sx={{
            position: "fixed",
            zIndex: 10,
            top: "10",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "17px",
            mb: "2",
          }}
        >
          {error}
        </Alert>
      )}
      <div
        style={{
          color: "#000",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Tổng quan đơn hàng
      </div>
      {selectedProducts.length === 0 ? (
        <div>
          <p>
            <a href="/products">Vui lòng thêm sản phẩm vào đơn hàng</a>
          </p>
        </div>
      ) : (
        <div>
          <CustomerSection setCustomerInfo={handleSetCustomerInfo} />
          <StaffSection setStaffInfo={setStaffInfo} />
          <Bill
            selectedProducts={selectedProducts}
            onBuyNow={(updatedProducts, selectedButton, note) => {
              handleBuyNow(updatedProducts);
              setSelectedButton(selectedButton);
              setNote(note);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
