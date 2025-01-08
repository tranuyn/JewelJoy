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
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
interface Filters {
  materials: string[]; // Array of selected materials
  sort: string; // Sorting option (e.g., 'Increase', 'Decrease', etc.)
}
const ProductsAndService: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const { isAuthenticated, user, validateAuthStatus } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortType, setSortType] = useState("Default");

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
    if (user?.role == "CUSTOMER") {
      const existingProduct = selectedProducts.find((p) => p.id === product.id);

      const itemsToAdd = {
        id: product?.id,
        quantity: 1,
        name: product?.name,
        image: product?.imageUrl[0],
        price: existingProduct?.sellingPrice,
        type: existingProduct?.loaiSanPham,
        selected: false,
      };
      dispatch(addToCart(itemsToAdd));
      alert("Sản phẩm đã được thêm vào giỏ hàng");
      console.log(cartItems, itemsToAdd);
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

  useEffect(() => {
    // Filter and sort products whenever dependencies change
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.material.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMaterials.some((material) =>
          product.material.toLowerCase().includes(material.toLowerCase())
        )
      );
    }

    // Apply sorting
    switch (sortType) {
      case "Increase":
        filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case "Decrease":
        filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedMaterials, sortType, products]);

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
        const availableProducts = data.filter(
          (item: { status: string }) => item.status === "available"
        );

        // Gán các sản phẩm đã lọc vào state
        setProducts(availableProducts);
        setFilteredProducts(availableProducts);
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
                products={filteredProducts}
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
  const handelQuery = (query: string) => {
    setSearchQuery(query);
  };
  const handleMaterialFilter = (materials: string[]) => {
    setSelectedMaterials(materials);
  };

  const handleSort = (type: string) => {
    setSortType(type);
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
      {activeTab != "Dịch vụ" && (
        <SearchAndFilter
          onSearch={handelQuery}
          onMaterialFilter={handleMaterialFilter}
          onSort={handleSort}
        />
      )}

      <div className="page-content">
        <div className="content-text">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProductsAndService;
