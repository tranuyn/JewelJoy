import React, { useEffect, useState } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import InventoryTab from "./InventoryTab";
import ReportTab from "./ReportTab";

// Types

export interface Data {
  code: string;
  name: string;
  quantity: number;
  unit: string;
  description: string;
  price: number;
  import_date: string;
  options: string;
}
export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  material: string;
  costPrice: number;
  sellingPrice: number;
  imageUrl: string[];
  loaiSanPham: string;
  quantity: number;
  weight: number;
  status: string;
  chiPhiPhatSinh: number;
  supplierId: string | null;
  entryDate: string | null;
  images: (File | null)[];
}

export interface InventoryItem {
  product: Product;
  soLuongTonDau: number;
  soLuongNhap: number;
  soLuongBan: number;
  soLuongTonCuoi: number;
}
export interface Column {
  id: keyof (Product & { options: string });
  label: string;
}

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Kho");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8081/jewelry/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Không thể tải dữ liệu sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tabs = ["Kho", "Báo cáo"];

  return (
    <div>
      <Header title="Kho hàng" />
      <div className="customTabbarPosition">
        <TabBar
          tabs={tabs}
          onTabChange={setActiveTab}
          styleType="custom"
          defaultTab="Kho"
        />
      </div>

      {activeTab === "Kho" ? (
        <InventoryTab
          products={products}
          loading={loading}
          error={error}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          setProducts={setProducts}
        />
      ) : (
        <ReportTab date={new Date().toLocaleDateString()} />
      )}
    </div>
  );
};

export default Inventory;
