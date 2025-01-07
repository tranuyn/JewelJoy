import React, { useEffect, useState } from "react";
import TabBar from "../../component/Tabbar/TabBar";
import Header from "./header";
// import VongCo from "./VongCo";
// import Nhan from "./Nhan";
// import HoaTai from "./HoaTai";
// import VongTay from "./VongTay";
import { useAuth } from "../../services/useAuth";
import Bill from "./ProductAndBill/Bill";
import Product from "./ProductAndBill/Product";
import SearchAndFilter from "./SearchAndFilter/searchAndFilter";
import Services from "./Services";
import "./style.css";

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
const ProductsAndService: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const { isAuthenticated, user, validateAuthStatus } = useAuth();
  const handleSelectProduct = (product: ProductType) => {
    if (
      user?.role === "ADMIN" ||
      user?.role === "INVENTORY_STAFF" ||
      user?.role === "SALE_STAFF"
    ) {
      const existingProduct = selectedProducts.find((p) => p.id === product.id);
    
      if (existingProduct) {
        // If the product already exists, increase its quantity
        setSelectedProducts((prev) =>
          prev.map((p) =>
            p.id === product.id
              ? { ...p, quantityInBill: p.quantityInBill + 1 }
              : p
          )
        );
      } else {
        setSelectedProducts((prev) => [
          ...prev,
          { ...product, quantityInBill: 1 },
        ]);
      }
    }
    if (user?.role == "CUSTOMER"){
      const handleAddToCart = () => {
        const existingProduct = selectedProducts.find((p) => p.id === product.id);
        const itemsToAdd = 
          { productId: existingProduct?.id, quantity: 1, name : existingProduct?.name, image : existingProduct?.imageUrl[0], price:existingProduct?.sellingPrice, type:existingProduct?.loaiSanPham }
        
        // dispatch(addCart({ 
        //   customerId: "123", 
        //   items: itemsToAdd 
        // }));
      };
    }
  };

  const handleDeleteProduct = (id: string) => {
    console.log("hehe");
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
    console.log("sau khi xoa" + setSelectedProducts);
  };

  const handleIncreaseProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantityInBill: p.quantityInBill + 1 } : p
      )
    );
  };

  const handleDecreaseProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantityInBill > 1
          ? { ...p, quantityInBill: p.quantityInBill - 1 }
          : p
      )
    );
  };

  const tabs = [
    "Tất cả",
    "Đá quý",
    "Vòng cổ",
    "Nhẫn",
    "Hoa tai",
    "Vòng tay",
    "Dịch vụ",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/jewelry/"); // Replace with your API URL
        const data = await response.json();
        setProducts(data); // Assume data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Đá quý":
        const charmsProducts = products.filter((product) =>
          ["DAQUY", "KIMCUONG", "THACH", "NGOC"].includes(product.loaiSanPham)
        );
        return (
          <div className="pbcontainer">
            <div className="product-container">
              <Product
                products={charmsProducts}
                onSelectProduct={handleSelectProduct}
              />
            </div>

            {(user?.role === "ADMIN" ||
              user?.role === "INVENTORY_STAFF" ||
              user?.role === "SALE_STAFF") && (
              <div className="bill-container">
                <Bill
                  selectedProducts={selectedProducts}
                  onRemoveProduct={handleDeleteProduct}
                  onIncreaseProduct={handleIncreaseProduct}
                  onDecreaseProduct={handleDecreaseProduct}
                />
              </div>
            )}
          </div>
        );
      case "Vòng cổ":
        const VongCoProducts = products.filter(
          (product) => product.loaiSanPham === "DAYCHUYEN" // So sánh trực tiếp giá trị chuỗi
        );
        return (
          <div className="pbcontainer">
            <div className="product-container">
              <Product
                products={VongCoProducts}
                onSelectProduct={handleSelectProduct}
              />
            </div>

            {(user?.role === "ADMIN" ||
              user?.role === "INVENTORY_STAFF" ||
              user?.role === "SALE_STAFF") && (
              <div className="bill-container">
                <Bill
                  selectedProducts={selectedProducts}
                  onRemoveProduct={handleDeleteProduct}
                  onIncreaseProduct={handleIncreaseProduct}
                  onDecreaseProduct={handleDecreaseProduct}
                />
              </div>
            )}
          </div>
        );
      case "Nhẫn":
        const nhanProducts = products.filter(
          (product) => product.loaiSanPham === "NHAN" // So sánh trực tiếp giá trị chuỗi
        );
        return (
          <div className="pbcontainer">
            <div className="product-container">
              <Product
                products={nhanProducts}
                onSelectProduct={handleSelectProduct}
              />
            </div>

            {(user?.role === "ADMIN" ||
              user?.role === "INVENTORY_STAFF" ||
              user?.role === "SALE_STAFF") && (
              <div className="bill-container">
                <Bill
                  selectedProducts={selectedProducts}
                  onRemoveProduct={handleDeleteProduct}
                  onIncreaseProduct={handleIncreaseProduct}
                  onDecreaseProduct={handleDecreaseProduct}
                />
              </div>
            )}
          </div>
        );
      case "Hoa tai":
        const bongTaiProducts = products.filter(
          (product) => product.loaiSanPham === "BONGTAI" // So sánh trực tiếp giá trị chuỗi
        );
        return (
          <div className="pbcontainer">
            <div className="product-container">
              <Product
                products={bongTaiProducts}
                onSelectProduct={handleSelectProduct}
              />
            </div>

            {(user?.role === "ADMIN" ||
              user?.role === "INVENTORY_STAFF" ||
              user?.role === "SALE_STAFF") && (
              <div className="bill-container">
                <Bill
                  selectedProducts={selectedProducts}
                  onRemoveProduct={handleDeleteProduct}
                  onIncreaseProduct={handleIncreaseProduct}
                  onDecreaseProduct={handleDecreaseProduct}
                />
              </div>
            )}
          </div>
        );
      case "Vòng tay":
        const vongTayProducts = products.filter(
          (product) => product.loaiSanPham === "VONGTAY" // So sánh trực tiếp giá trị chuỗi
        );
        return (
          <div className="pbcontainer">
            <div className="product-container">
              <Product
                products={vongTayProducts}
                onSelectProduct={handleSelectProduct}
              />
            </div>

            {(user?.role === "ADMIN" ||
              user?.role === "INVENTORY_STAFF" ||
              user?.role === "SALE_STAFF") && (
              <div className="bill-container">
                <Bill
                  selectedProducts={selectedProducts}
                  onRemoveProduct={handleDeleteProduct}
                  onIncreaseProduct={handleIncreaseProduct}
                  onDecreaseProduct={handleDecreaseProduct}
                />
              </div>
            )}
          </div>
        );
      case "Dịch vụ":
        return <Services />;
      default:
        return (
          <div className="pbcontainer">
            <div className="product-container">
              <Product
                products={products}
                onSelectProduct={handleSelectProduct}
              />
            </div>

            {(user?.role === "ADMIN" ||
              user?.role === "INVENTORY_STAFF" ||
              user?.role === "SALE_STAFF") && (
              <div className="bill-container">
                <Bill
                  selectedProducts={selectedProducts}
                  onRemoveProduct={handleDeleteProduct}
                  onIncreaseProduct={handleIncreaseProduct}
                  onDecreaseProduct={handleDecreaseProduct}
                />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F9FCFF",
        position: "relative",
        overflow: "visible",
        height: "100vh",
      }}
    >
      {(user?.role === "ADMIN" ||
        user?.role === "INVENTORY_STAFF" ||
        user?.role === "SALE_STAFF") && <Header />}
      <div className="pbanner">
        <div className="pbannerTextContainer">
          <span className="pmorri">
            MORRI<br></br>JEWELRY
          </span>
          <span className="pTitle">
            <br />
            Mỗi một món trang sức đều có câu chuyện riêng. Đeo trang sức là cách
            thể hiện bạn trân trọng kỷ niệm mà không cần một lời nói nào.
          </span>
        </div>
      </div>

      <TabBar
        tabs={tabs}
        onTabChange={setActiveTab}
        styleType="default"
        defaultTab="Tất cả"
      />
      <SearchAndFilter />

      {/* <div className="pbcontainer">
        <div className="product-container">
          <Product products={products} onSelectProduct={handleSelectProduct} />
        </div>

        <div className="bill-container">
          <Bill selectedProducts={selectedProducts} />
        </div>
      </div> */}

      <div className="page-content">
        <div className="content-text">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProductsAndService;
