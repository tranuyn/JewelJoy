import React from "react";

// Define the type for a single product
interface ProductType {
  id: string;
  name: string;
  material: string;
  sellingPrice: number;
  imageUrl: string[];
}

// Define the props interface for the Product component
interface ProductProps {
  products: ProductType[]; // Array of products
}

const Product: React.FC<ProductProps> = ({ products }) => {
  return (
    <div className="productContainer">
      {products.length === 0 ? (
        <div>Không có sản phẩm nào.</div> // Message for no products
      ) : (
        <div className="productGrid">
          {products.map((product) => (
            <div key={product.id} className="productItem">
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
