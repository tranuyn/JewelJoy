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
  quantity: number;
  quantityInBill: number;
  loaiSanPham: string;
}

interface BillProps {
  selectedProducts: ProductType[];
  onRemoveProduct: (id: string) => void;
  onIncreaseProduct: (id: string) => void;
  onDecreaseProduct: (id: string) => void;
}

const Bill: React.FC<BillProps> = ({
  selectedProducts,
  onRemoveProduct,
  onIncreaseProduct,
  onDecreaseProduct,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProductInBill, setSelectedProducts] =
    useState<ProductType[]>(selectedProducts);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

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

  const incrementQuantity = (id: string) => {
    // Increment the product quantity in the bill
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 0) + 1;
      onIncreaseProduct(id); // Call the onIncreaseProduct callback
      return { ...prev, [id]: newQuantity };
    });
  };

  const decrementQuantity = (id: string) => {
    // Decrement the product quantity in the bill
    if (quantities[id] > 1) {
      setQuantities((prev) => {
        const newQuantity = (prev[id] || 0) - 1;
        onDecreaseProduct(id); // Call the onDecreaseProduct callback
        return { ...prev, [id]: newQuantity };
      });
    }
  };

  // Toggle dropdown logic
  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id); // Close if the same dropdown is clicked
  };

  // Remove product logic
  const handleDelete = (id: string) => {
    onRemoveProduct(id); // Call the onRemoveProduct function passed via props
    setDropdownOpen(null); // Close the dropdown after removing product
  };

  function formatPrice(price: number): string {
    if (isNaN(price)) {
      return "0"; // Return "0" if the value is not a valid number
    }

    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format the price with a dot separator for thousands
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
                            onClick={() => setDropdownOpen(null)} // Close the dropdown without removing product
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

      <button className="BuyNowButton" onClick={handleBuyNow}>
        Mua ngay
      </button>
    </div>
  );
};

export default Bill;
