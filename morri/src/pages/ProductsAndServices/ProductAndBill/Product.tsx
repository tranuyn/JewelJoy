import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Define the type for a single product
interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[];
  quantityInBill: number;
}

// Define the props interface for the Product component
interface ProductProps {
  products: ProductType[]; // Array of products
  onSelectProduct: (product: ProductType) => void; // Function to handle selection
}

const Product: React.FC<ProductProps> = ({ products, onSelectProduct }) => {
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
                className="pimgcontainer"
                src={product.imageUrl[0]}
                alt={product.name}
              />
              <div className="productName">{product.name}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "#717171" }}>{product.material}</div>
                <div style={{ color: "#e54141", fontWeight: 500 }}>
                  {product.sellingPrice} VND
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
