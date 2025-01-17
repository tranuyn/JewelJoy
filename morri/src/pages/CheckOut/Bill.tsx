import React, { useState, useEffect } from "react";
import "./style.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[] | string;
  quantityInBill: number;
  loaiSanPham: string;
}
interface BillProps {
  selectedProducts: ProductType[]; // Array of selected products
  onBuyNow: (
    updatedProducts: ProductType[],
    selectedButton: string,
    note: string,
    totalPrice: number
  ) => void;
}
interface Voucher {
  id: number;
  voucherName: string;
  voucherCode: string;
  discount: number;
  description: string;
}

const Bill: React.FC<BillProps> = ({ selectedProducts, onBuyNow }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [discount, setDiscount] = useState<Voucher[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);

  const [selectedProductInBill, setSelectedProducts] =
    useState<ProductType[]>(selectedProducts);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [note, setNote] = useState("");
  useEffect(() => {
    if (selectedProducts.length > 0) {
      const initialQuantities = selectedProducts.reduce((acc, product) => {
        acc[product.id] = product.quantityInBill || 1; // Default to 1 if not set
        return acc;
      }, {} as Record<string, number>);
      setQuantities(initialQuantities);
    }
  }, [selectedProducts]);

  useEffect(() => {
    setSelectedProducts(selectedProducts);
    console.log(selectedProductInBill);
    handleGetDiscount();
  }, [selectedProducts, cartItems]);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const incrementQuantity = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] - 1,
    }));
  };

  const toggleDropdown = (id: string) => {
    console.log("toggleDropdown " + id);
    setDropdownOpen(dropdownOpen === id ? null : id);
    console.log(dropdownOpen);
  };

  const handleDelete = (id: string) => {
    const updatedProducts = selectedProductInBill.filter((p) => p.id !== id);
    setSelectedProducts(updatedProducts);
    setDropdownOpen(null); // Close dropdown after deleting
  };

  function formatPrice(price: number): string {
    if (isNaN(price)) {
      return "0"; // Trả về "0" nếu giá trị không hợp lệ
    }

    // Chuyển giá trị thành chuỗi và chia thành các nhóm 3 chữ số
    return price
      .toString() // Chuyển thành chuỗi
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm sau mỗi 3 chữ số
  }

  useEffect(() => {
    console.log("Total with Discount: ", calculateTotalWithDiscount());
    console.log("quantities: ", quantities);
  }, [selectedDiscount, quantities]);

  const calculateSubtotal = () => {
    return selectedProductInBill.reduce((total, product) => {
      return total + product.sellingPrice * quantities[product.id];
    }, 0);
  };

  const calculateTotalWithDiscount = () => {
    const subtotal = calculateSubtotal();
    console.log("subtotal:", subtotal);

    if (!selectedDiscount) {
      console.log("No discount selected");
      return subtotal;
    }

    console.log("vao1 ", selectedDiscount);
    const discountAmount = subtotal * (selectedDiscount / 100);
    console.log(discountAmount);
    return subtotal - discountAmount;
  };

  const handleDiscountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedDiscount(parseInt(value));
    console.log(selectedDiscount);
  };

  const handleBuyNow = async () => {
    if (!selectedButton) {
      // Nếu chưa chọn nút, có thể là một lỗi hoặc thông báo cho người dùng
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    const updatedProducts = selectedProductInBill.map((product) => {
      return {
        ...product,
        quantityInBill: quantities[product.id] || 1,
      };
    });

    const finalPrice = calculateTotalWithDiscount();
    if (finalPrice === 0) {
      alert("Vui lòng chọn sản phẩm để thanh toán!");
    }

    onBuyNow(updatedProducts, selectedButton, note, finalPrice);
  };

  // Hàm để thay đổi state khi click vào button
  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const handleGetDiscount = async () => {
    try {
      const response = await fetch("http://localhost:8081/voucher/active");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Voucher[] = await response.json();
      setDiscount(data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  return (
    <div className="bbillContainer" style={{ paddingBottom: "50px" }}>
      <div>
        {selectedProducts.length === 0 ? (
          <div>Chưa có sản phẩm nào được chọn.</div>
        ) : (
          <div style={{ margin: "10px 0px" }}>
            {selectedProductInBill.map((product) => (
              <div key={product.id} className="billItemContainerCheckout">
                <div className="billdropdownCheckout">
                  <RemoveCircleOutlineIcon
                    fontSize="small"
                    sx={{
                      marginBottom: 0,
                      color: "#EFB26A",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleDropdown(product.id)}
                  />
                  {dropdownOpen === product.id && (
                    <div className="billdropdown-contentCheckout">
                      <button
                        className="billdropdown-content-buttonCheckout"
                        onClick={() => handleDelete(product.id)}
                      >
                        Xóa
                      </button>
                      <button
                        className="billdropdown-content-buttonCheckout"
                        onClick={() => setDropdownOpen(null)}
                      >
                        Hủy
                      </button>
                    </div>
                  )}
                </div>
                <img
                  src={
                    Array.isArray(product.imageUrl)
                      ? product.imageUrl[0]
                      : product.imageUrl
                  }
                  style={{ width: 150, height: 150, margin: "0px 20px" }}
                />
                <div
                  style={{
                    height: 150,
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
                  <div className="billItemQuantityCheckout">
                    <div
                      className="buttonSubCheckout"
                      onClick={() => decrementQuantity(product.id)}
                    >
                      -
                    </div>
                    <div className="buttonNoneCheckout">
                      {quantities[product.id]}
                    </div>
                    <div
                      className="buttonSubCheckout"
                      onClick={() => incrementQuantity(product.id)}
                    >
                      +
                    </div>
                  </div>
                  <div className="billItemPriceCheckout">
                    Tổng:{" "}
                    {formatPrice(product.sellingPrice * quantities[product.id])}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="totalCheckout">
        <div style={{ fontWeight: 600, fontSize: "18px" }}>Tổng đơn hàng:</div>
        <div
          className="billItemPriceCheckout"
          style={{ fontSize: "18px", color: "#F92121" }}
        >
          {formatPrice(calculateSubtotal())} VND
        </div>
      </div>

      {selectedDiscount !== null && (
        <div className="totalCheckout">
          <div style={{ fontWeight: 600, fontSize: "18px" }}>
            Sau khi giảm giá:
          </div>
          <div
            className="billItemPriceCheckout"
            style={{ fontSize: "18px", color: "#F92121" }}
          >
            {formatPrice(calculateTotalWithDiscount())} VND
          </div>
        </div>
      )}

      <div style={{ margin: "10px 30px" }}>
        <div className="billItemNameCheckout" style={{ margin: "10px 0px" }}>
          Chọn phương thức thanh toán
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            className={`buttoPayMethod ${
              selectedButton === "CASH" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("CASH")}
          >
            <LocalAtmIcon sx={{ marginRight: "10px" }} /> Thanh toán bằng tiền
            mặt
          </button>
          <button
            className={`buttoPayMethod ${
              selectedButton === "CREDIT_CARD" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("CREDIT_CARD")}
          >
            <CreditCardIcon sx={{ marginRight: "10px" }} /> Thanh toán qua thẻ
            tín dụng
          </button>
          <button
            className={`buttoPayMethod ${
              selectedButton === "DIGITAL" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("DIGITAL")}
          >
            <QrCodeScannerIcon sx={{ marginRight: "10px" }} /> Thanh toán qua QR
          </button>
        </div>
        <select
          value={selectedDiscount === null ? "" : selectedDiscount}
          onChange={handleDiscountChange}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            marginTop: "10px",
            width: "100%",
          }}
        >
          <option value="">Hủy mã giảm giá</option>
          {discount.map((voucher) => (
            <option key={voucher.id} value={voucher.discount}>
              {voucher.voucherName} - Giảm {voucher.discount}%
            </option>
          ))}
        </select>

        <div className="billItemNameCheckout" style={{ margin: "10px 0px" }}>
          Ghi chú cho đơn hàng (không bắt buộc)
        </div>
        <textarea
          className="billNoteCheckout"
          rows={10}
          style={{ width: "100%" }}
          value={note}
          onChange={(e) => setNote(e.target.value)} // Cập nhật state khi người dùng nhập
        />

        <button className="BuyNowButtonCheckout" onClick={() => handleBuyNow()}>
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default Bill;
