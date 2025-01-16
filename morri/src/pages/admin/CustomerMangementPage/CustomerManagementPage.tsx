import React, { useState, useEffect } from "react";
import "./customer.css";
import Header from "../../../component/Title_header/Header";
import TabBar from "../../../component/Tabbar/TabBar";
import { Box } from "@mui/material";
import TableComponent from "../../../component/TableComponent/TableComponent";
import SearchComponent from "../../../component/SearchComponent/SearchComponent";
import AddCustomer from "./addCustomer";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import UpdateCustomer from "./updateCustomer";
import DeleteComponent from "../../../component/DeleteComponent/DeleteComponent";
import Snackbar from "../../../component/Snackbar/Snackbar";
import { FormData } from "./updateCustomer";

export interface Customer {
  id: string;
  name: string;
  gioiTinh: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  ngayDangKyThanhVien: string;
  danhSachSanPhamDaMua: string[] | null;
}

export interface Customer {
  id: string;
  name: string;
  gioiTinh: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  ngayDangKyThanhVien: string;
  danhSachSanPhamDaMua: string[] | null;
}

interface PurchaseCustomer {
  id: string;
  customerName: string;
  cccd: string;
  sdt: string | null;
  totalPrice: number;
  createdAt: string;
  customerId?: {
    name: string;
    phoneNumber: string;
  };
}

const sellColumns = [
  { field: "ID", headerName: "ID khách hàng" },
  { field: "name", headerName: "Tên khách hàng" },
  { field: "dateOfBirth", headerName: "Ngày sinh" },
  { field: "phoneNumber", headerName: "SDT" },
  { field: "orderCount", headerName: "SL bán" },
  { field: "gender", headerName: "Giới tính" },
  { field: "registrationDate", headerName: "Ngày đăng ký" },
];

const buyColumns = [
  { field: "name", headerName: "Tên khách hàng" },
  { field: "phoneNumber", headerName: "SDT" },
  { field: "cccd", headerName: "CCCD" },
  { field: "purchaseCount", headerName: "SL mua" },
  { field: "totalSpent", headerName: "Tổng tiền" },
  { field: "lastPurchaseDate", headerName: "Ngày mua gần nhất" },
];
type SnackbarSeverity = "success" | "error" | "warning" | "info";

const CustomerManagementPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [purchaseCustomers, setPurchaseCustomers] = useState<
    PurchaseCustomer[]
  >([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [filteredPurchaseCustomers, setFilteredPurchaseCustomers] = useState<
    PurchaseCustomer[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("Khách hàng bán");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [rowClicked, setRowClicked] = useState<Customer | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  useEffect(() => {
    fetchCustomers();
    fetchPurchaseCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchKeyword, customers, purchaseCustomers, activeTab]);

  const fetchPurchaseCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8081/billMua");
      const data = await response.json();
      setPurchaseCustomers(data);
    } catch (error) {
      console.error("Error fetching purchase customers:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8081/customer/");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const filterCustomers = () => {
    const keyword = searchKeyword.toLowerCase().trim();

    if (activeTab === "Khách hàng bán") {
      const filtered = customers.filter((customer) =>
        !keyword
          ? true
          : customer.name?.toLowerCase().includes(keyword) ||
            customer.email?.toLowerCase().includes(keyword) ||
            customer.phoneNumber?.toLowerCase().includes(keyword) ||
            customer.id?.toLowerCase().includes(keyword)
      );
      setFilteredCustomers(filtered);
    } else {
      const filtered = purchaseCustomers.filter((customer) =>
        !keyword
          ? true
          : customer.customerName?.toLowerCase().includes(keyword) ||
            customer.cccd?.toLowerCase().includes(keyword) ||
            customer.customerId?.phoneNumber?.toLowerCase().includes(keyword)
      );
      setFilteredPurchaseCustomers(filtered);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    };
    return new Intl.DateTimeFormat("vi-VN", options).format(
      new Date(dateString)
    );
  };

  const transformSellData = () => {
    return filteredCustomers.map((customer) => ({
      ID: customer.id,
      name: customer.name,
      dateOfBirth: formatDate(customer.dateOfBirth),
      phoneNumber: customer.phoneNumber || "N/A",
      orderCount: customer.danhSachSanPhamDaMua?.length || 0,
      gender: customer.gioiTinh === "MALE" ? "Nam" : "Nữ",
      registrationDate: formatDate(customer.ngayDangKyThanhVien),
    }));
  };

  const transformBuyData = () => {
    // Group purchases by customer (either by CCCD for non-members or by customerId for members)
    const customerPurchases = purchaseCustomers.reduce((acc, purchase) => {
      const key = purchase.customerId?.name || purchase.customerName;
      if (!acc[key]) {
        acc[key] = {
          name: purchase.customerId?.name || purchase.customerName,
          phoneNumber:
            purchase.customerId?.phoneNumber || purchase.sdt || "N/A",
          cccd: purchase.cccd || "N/A",
          purchaseCount: 0,
          totalSpent: 0,
          lastPurchaseDate: purchase.createdAt,
        };
      }
      acc[key].purchaseCount++;
      acc[key].totalSpent += purchase.totalPrice;
      if (new Date(purchase.createdAt) > new Date(acc[key].lastPurchaseDate)) {
        acc[key].lastPurchaseDate = purchase.createdAt;
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(customerPurchases).map((customer) => ({
      ...customer,
      totalSpent: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(customer.totalSpent),
      lastPurchaseDate: formatDate(customer.lastPurchaseDate),
    }));
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (rowClicked) {
        setCustomerId(rowClicked.id);
        // const customerId = rowClicked.id;
        const response = await fetch(
          `http://localhost:8081/customer/${customerId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Xóa khách hàng thành công!");
          setSnackbarVisible(true);
          setIsDeleteModalOpen(false);
          await fetchCustomers();
        }
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Vui lòng chọn khách hàng để xóa!");
        setSnackbarVisible(true);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error xóa khách hàng!");
      setSnackbarVisible(true);
      setIsDeleteModalOpen(false);
    }
  };
  const handleUpdate = async (formData: FormData): Promise<void> => {
    try {
      if (!rowClicked?.id) {
        throw new Error("No customer selected");
      }

      const updatedCustomer = {
        name: formData.name || rowClicked.name,
        gioiTinh: formData.gioiTinh
          ? formData.gioiTinh === "Nam"
            ? "MALE"
            : "FEMALE"
          : rowClicked.gioiTinh,
        phoneNumber: formData.phoneNumber || rowClicked.phoneNumber,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : rowClicked.dateOfBirth,
        email: formData.email || rowClicked.email,
        ngayDangKyThanhVien: formData.registrationDate
          ? new Date(formData.registrationDate).toISOString()
          : rowClicked.ngayDangKyThanhVien,
      };

      const response = await fetch(
        `http://localhost:8081/customer/${rowClicked.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCustomer),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update customer");
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Cập nhật khách hàng thành công!");
      setSnackbarVisible(true);
      setIsModalUpdateOpen(false);
      await fetchCustomers();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error instanceof Error ? error.message : "Error cập nhật khách hàng!"
      );
      setSnackbarVisible(true);
      setIsModalUpdateOpen(false);
    }
  };

  const handleAdd = async (formData: {
    name: string | number;
    gioiTinh: string | number;
    phoneNumber: string | number;
    dateOfBirth: string | number;
    email: string | number;
    registrationDate?: string | number;
  }): Promise<void> => {
    try {
      const formatDate = (dateString: string | number) => {
        const date = new Date(dateString);
        return date.toISOString();
      };

      const requestBody = {
        name: formData.name,
        gioiTinh: formData.gioiTinh === "Nam" ? "MALE" : "FEMALE",
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formatDate(formData.dateOfBirth),
        email: formData.email || undefined,
        ngayDangKyThanhVien: formData.registrationDate
          ? formatDate(formData.registrationDate)
          : undefined,
      };

      console.log("Request body:", JSON.stringify(requestBody));

      const response = await fetch("http://localhost:8081/customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log("response body:", JSON.stringify(response));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add customer");
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Thêm khách hàng thành công!");
      setSnackbarVisible(true);
      setIsModalOpen(false);
      await fetchCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error instanceof Error ? error.message : "Error thêm khách hàng!"
      );
      setSnackbarVisible(true);
      setIsModalOpen(false);
    }
  };

  const tabs = ["Khách hàng bán", "Khách hàng mua"];

  return (
    <div className="customer-management">
      <Header title="Quản lý khách hàng" />
      <div style={{ padding: "10px" }}></div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 3,
          marginLeft: "20px",
        }}
      >
        {activeTab === "Khách hàng bán" && (
          <BtnComponent
            btnColorType="primary"
            btnText="Thêm khách hàng"
            onClick={() => setIsModalOpen(true)}
          />
        )}
        <Box sx={{ marginRight: "300px" }}>
          <TabBar
            tabs={tabs}
            onTabChange={setActiveTab}
            defaultTab="Khách hàng bán"
            styleType="custom"
          />
        </Box>
        <SearchComponent
          placeholder="Tìm kiếm khách hàng..."
          keyword={searchKeyword}
          onSearch={handleSearch}
        />
      </Box>

      <div style={{ padding: "10px" }}></div>

      <TableComponent
        columns={activeTab === "Khách hàng bán" ? sellColumns : buyColumns}
        data={
          activeTab === "Khách hàng bán"
            ? transformSellData()
            : transformBuyData()
        }
        onRowClick={(row) => {
          if (activeTab === "Khách hàng bán") {
            const customer = customers.find((c) => c.id === row.ID);
            setRowClicked(customer || null);
          }
        }}
        onEdit={
          activeTab === "Khách hàng bán"
            ? (row) => setIsModalUpdateOpen(true)
            : undefined
        }
        onDelete={
          activeTab === "Khách hàng bán"
            ? (row) => setIsDeleteModalOpen(true)
            : undefined
        }
      />

      {/* Keep existing modals */}
      <AddCustomer
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAdd={handleAdd}
      />
      <UpdateCustomer
        isModalOpen={isModalUpdateOpen}
        setIsModalOpen={setIsModalUpdateOpen}
        initialData={rowClicked}
        handleUpdate={handleUpdate}
      />
      <DeleteComponent
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteName={customerId}
        handleDelete={handleDelete}
      />
      <Snackbar
        snackbarSeverity={snackbarSeverity}
        message={snackbarMessage}
        show={snackbarVisible}
        onClose={() => setSnackbarVisible(false)}
        autoHideDuration={5000}
      />
    </div>
  );
};

export default CustomerManagementPage;
