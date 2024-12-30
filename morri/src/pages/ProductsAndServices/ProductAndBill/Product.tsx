import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

// Define the type for a single product
interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[];
  quantityInBill: number;
  loaiSanPham: string;
}

// Define the props interface for the Product component
interface ProductProps {
  products: ProductType[]; // Array of products
  onSelectProduct: (product: ProductType) => void; // Function to handle selection
}

const Product: React.FC<ProductProps> = ({ products, onSelectProduct }) => {
  function formatPrice(price: number): string {
    if (isNaN(price)) {
      return "0"; // Trả về "0" nếu giá trị không hợp lệ
    }

    // Chuyển giá trị thành chuỗi và chia thành các nhóm 3 chữ số
    return price
      .toString() // Chuyển thành chuỗi
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm sau mỗi 3 chữ số
  }

  const navigator = useNavigate();
  function viewProductDetail(id: string) {
    navigator(`/products/detail/${id}`);
  }
  return (
    <div className="productContainer">
      {products.length === 0 ? (
        <div>Không có sản phẩm nào.</div> // Message for no products
      ) : (
        <div className="productGrid">
          {products.map((product) => (
            <div key={product.id} className="productItem">
              <div className="iconAddInProduct">
                <AddCircleOutlineIcon
                  sx={{ marginBottom: 0, color: "white" }}
                  onClick={() => onSelectProduct(product)}
                />
              </div>
              <img
                onClick={() => viewProductDetail(product.id)}
                className="pimgcontainer"
                src={product.imageUrl[0]}
                alt={product.name}
              />
              <div
                className="productName"
                onClick={() => viewProductDetail(product.id)}
              >
                {product.name}
              </div>
              <div
                onClick={() => viewProductDetail(product.id)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "#717171" }}>{product.material}</div>
                <div style={{ color: "#e54141", fontWeight: 500 }}>
                  {formatPrice(product.sellingPrice)} VND
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
