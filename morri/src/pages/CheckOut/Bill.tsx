import React, { useState, useEffect } from "react";
import "./style.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[];
  quantityInBill: number;
  loaiSanPham: string;
}

interface BillProps {
  selectedProducts: ProductType[]; // Array of selected products
  onBuyNow: (
    updatedProducts: ProductType[],
    selectedButton: string,
    note: string
  ) => void;
}

const Bill: React.FC<BillProps> = ({ selectedProducts, onBuyNow }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
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
  }, [selectedProducts]);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const incrementQuantity = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementQuantity = (id: string) => {
    if (quantities[id] === 1) return;
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

  const handleBuyNow = () => {
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

    onBuyNow(updatedProducts, selectedButton, note);
  };

  // Hàm để thay đổi state khi click vào button
  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
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
                  src={product.imageUrl[0]}
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
          {formatPrice(
            selectedProducts.reduce((total, product) => {
              return total + product.sellingPrice * quantities[product.id];
            }, 0)
          )}{" "}
          VND
        </div>
      </div>

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
