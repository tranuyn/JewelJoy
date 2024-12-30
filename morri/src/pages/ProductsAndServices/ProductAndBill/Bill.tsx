import React, { useState, useEffect } from "react";
import "./style.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";

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
  // onRemoveProduct: (id: string) => void; // Function to remove a product
}

const Bill: React.FC<BillProps> = ({ selectedProducts }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProductInBill, setSelectedProducts] =
    useState<ProductType[]>(selectedProducts);

  const navigate = useNavigate();
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
    navigate("/products/checkout", {
      state: {
        selectedProducts,
        quantities,
      },
    });
  };

  return (
    <div className="bbillContainer">
      <div style={{ fontWeight: 600, marginBottom: "10px" }}>
        Hóa đơn mua hàng
      </div>
      <div
        style={{
          flex: 1,
          height: "100%",
          overflowY: "scroll",
          paddingRight: "10px",
        }}
      >
        {selectedProducts.length === 0 ? (
          <div>Chưa có sản phẩm nào được chọn.</div>
        ) : (
          <div>
            {selectedProductInBill.map((product) => (
              <div key={product.id} className="billItemContainer">
                <img
                  src={product.imageUrl[0]}
                  style={{ width: 70, height: 70, borderRadius: 70 }}
                />
                <div>
                  <div
                    className="billItemContainer"
                    style={{ border: "none", padding: 0 }}
                  >
                    <div className="billItemName">{product.name}</div>

                    <div className="billdropdown">
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
                        <div className="billdropdown-content">
                          <button
                            className="billdropdown-content-button"
                            onClick={() => handleDelete(product.id)}
                          >
                            Xóa
                          </button>
                          <button
                            className="billdropdown-content-button"
                            onClick={() => setDropdownOpen(null)}
                          >
                            Hủy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="billItemPrice">
                    đ {formatPrice(product.sellingPrice)}
                  </div>
                  <div className="billItemQuantity">
                    <div
                      className="buttonSub"
                      onClick={() => decrementQuantity(product.id)}
                    >
                      -
                    </div>
                    <div className="buttonNone">{quantities[product.id]}</div>
                    <div
                      className="buttonSub"
                      onClick={() => incrementQuantity(product.id)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 600 }}>Tổng</div>
        <div className="billItemPrice" style={{ fontSize: "16px" }}>
          {formatPrice(
            selectedProducts.reduce((total, product) => {
              return total + product.sellingPrice * quantities[product.id];
            }, 0)
          )}{" "}
          VND
        </div>
      </div>

      <button className="BuyNowButton" onClick={() => handleBuyNow()}>
        Mua ngay
      </button>
    </div>
  );
};

export default Bill;
