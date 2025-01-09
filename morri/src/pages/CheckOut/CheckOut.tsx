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
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../services/useAuth";

interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[] | string;
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
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState<number>(1);
  const [updatedProducts, setUpdatedProducts] = useState<ProductType[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      if (user?.role === "CUSTOMER") {
        // Lọc các sản phẩm đã được chọn
        const selectedItems = cartItems.filter((item) => item.selected);

        // Chuyển đổi selectedItems thành mảng các đối tượng giống như bạn muốn
        const selectedProductsArray: ProductType[] = selectedItems.map(
          (item) => ({
            id: item.id.toString(), // Chuyển id từ number sang string
            name: item.name,
            material: item.type,
            sellingPrice: item.price,
            imageUrl: Array.isArray(item.image) ? item.image : [item.image],
            quantityInBill: item.quantity,
            loaiSanPham: item.type,
          })
        );

        // Cập nhật trạng thái với mảng selectedProducts
        setSelectedProducts(selectedProductsArray);
      } else {
        // Nếu role không phải CUSTOMER, lấy selectedProducts từ location.state
        setSelectedProducts(location.state.selectedProducts);
      }

      // Cập nhật số lượng từ location.state
      setQuantities(location.state.quantities);
    }
  }, [location.state, cartItems, user?.role]);

  const handleSetCustomerInfo = async (info: any) => {
    await setCustomerInfo(info);
  };

  useEffect(() => {
    if (updatedProducts.length > 0) {
      handleBuyNow(updatedProducts);
    }
  }, [totalPrice, updatedProducts, note, selectedButton, customerInfo]);

  const handleBuyNow = async (updatedProducts: ProductType[]) => {
    if (!staffInfo && user?.role != "CUSTOMER") {
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
      console.log("indfo", customerInfo);
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
    // try {

    const body = {
      createAt: new Date().toISOString(),
      customer: customerInfo.id,
      orderDetails: selectedProducts.map((product) => ({
        product: product.id,
        quantity: product.quantityInBill,
        unitPrice: product.sellingPrice,
        subtotal: product.sellingPrice * product.quantityInBill,
      })),
      paymentMethod: selectedButton,
      note: note,
      totalPrice: totalPrice,
      ...(user?.role !== "CUSTOMER" && { staff: staffInfo.id }),
      ...(user?.role !== "CUSTOMER"
        ? { status: "COMPLETED" }
        : { status: "ON_DELIVERY" }),
    };
    console.log(body);

    //   console.log(body);

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

    alert("Tạo đơn hàng thành công");
    navigate(`/products/checkout/${data.id}`, {
      state: {
        selectedProducts,
        customerInfo,
        staffInfo,
        note: note,
        orderId: data.id,
        selectedButton: selectedButton,
        totalPrice: totalPrice,
      },
    });
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
          {user?.role != "CUSTOMER" && (
            <StaffSection setStaffInfo={setStaffInfo} />
          )}

          <Bill
            selectedProducts={selectedProducts}
            onBuyNow={async (
              updatedProducts,
              selectedButton,
              note,
              totalPrice
            ) => {
              // Đảm bảo setTotalPrice hoàn thành trước khi tiếp tục
              await setTotalPrice(totalPrice);
              await setNote(note);
              await setSelectedButton(selectedButton);
              console.log("Total price after set: ", totalPrice);
              setUpdatedProducts(updatedProducts); // Lưu updatedProducts vào state
              // Sau khi setTotalPrice xong, mới gọi handleBuyNow
              // handleBuyNow(updatedProducts);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
