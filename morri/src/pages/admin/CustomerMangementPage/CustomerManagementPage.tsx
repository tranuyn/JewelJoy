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

const columns = [
  { field: "ID", headerName: "ID khách hàng" },
  { field: "name", headerName: "Tên khách hàng" },
  { field: "dateOfBirth", headerName: "Ngày sinh" },
  { field: "phoneNumber", headerName: "SDT" },
  { field: "orderCount", headerName: "SL bán" },
  { field: "gender", headerName: "Giới tính" },
  { field: "registrationDate", headerName: "Ngày đăng ký" },
];
type SnackbarSeverity = "success" | "error" | "warning" | "info";

const CustomerManagementPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const [activeTab, setActiveTab] = useState<string>("Khách hàng bán");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [rowClicked, setRowClicked] = useState<Customer | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<SnackbarSeverity>("info");
  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  useEffect(() => {
    filterCustomers();
  }, [searchKeyword, customers]);
  const filterCustomers = () => {
    if (!searchKeyword.trim()) {
      setFilteredCustomers(customers);
      return;
    }

    const keyword = searchKeyword.toLowerCase().trim();
    const filtered = customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(keyword) ||
        customer.email?.toLowerCase().includes(keyword) ||
        customer.phoneNumber?.toLowerCase().includes(keyword) ||
        customer.id.toLowerCase().includes(keyword) ||
        formatDate(customer.dateOfBirth).toLowerCase().includes(keyword) ||
        formatDate(customer.ngayDangKyThanhVien)
          .toLowerCase()
          .includes(keyword) ||
        (customer.gioiTinh === "MALE" ? "Nam" : "Nữ")
          .toLowerCase()
          .includes(keyword)
      );
    });

    setFilteredCustomers(filtered);
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const transformedData = filteredCustomers.map((customer) => ({
    ID: customer.id,
    name: customer.name,
    email: customer.email || "N/A",
    dateOfBirth: formatDate(customer.dateOfBirth),
    phoneNumber: customer.phoneNumber || "N/A",
    orderCount: customer.danhSachSanPhamDaMua?.length || 0,
    gender: customer.gioiTinh === "MALE" ? "Nam" : "Nữ",
    registrationDate: formatDate(customer.ngayDangKyThanhVien),
  }));

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
      // customerId
      console.log("Customer: " + rowClicked?.id);
      const response = await fetch(
        `http://localhost:8081/customer/${rowClicked?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Cập nhật khách hàng thành công!");
        setSnackbarVisible(true);
        setIsModalUpdateOpen(false);
        await fetchCustomers();
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error cập nhật khách hàng!");
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
      console.log("form data: " + JSON.stringify(formData));

      const response = await fetch("http://localhost:8081/customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          gioiTinh: formData.gioiTinh === "Nam" ? "MALE" : "FEMALE",
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email || undefined,
          ngayDangKyThanhVien: formData.registrationDate,
        }),
      });
      console.log("response: " + JSON.stringify(response));

      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm khách hàng thành công!");
        setSnackbarVisible(true);
        setIsModalOpen(false);
        await fetchCustomers();
      } else {
        throw new Error("Failed to add customer");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error thêm khách hàng!");
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
        <BtnComponent
          btnColorType="primary"
          btnText="Thêm khách hàng"
          onClick={() => setIsModalOpen(true)}
        />
        <AddCustomer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleAdd={handleAdd}
        />
        <Box sx={{ marginRight: "300px" }}>
          {/* <TabBar
            tabs={tabs}
            onTabChange={setActiveTab}
            defaultTab="Khách hàng bán"
            styleType="custom"
          /> */}
        </Box>
        <SearchComponent
          placeholder="Search customers..."
          keyword={searchKeyword}
          onSearch={handleSearch}
        />
      </Box>

      <div style={{ padding: "10px" }}></div>

      <TableComponent
        columns={columns}
        data={transformedData}
        onRowClick={(row) =>
          setRowClicked({
            id: row.ID,
            name: row.name,
            gioiTinh: row.gender === "Nam" ? "MALE" : "FEMALE",
            email: row.email,
            phoneNumber: row.phoneNumber,
            dateOfBirth: row.dateOfBirth,
            ngayDangKyThanhVien: row.registrationDate,
            danhSachSanPhamDaMua: [],
          })
        }
        onEdit={(row) => setIsModalUpdateOpen(true)}
        onDelete={(row) => setIsDeleteModalOpen(true)}
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
        onClose={handleCloseSnackbar}
        autoHideDuration={5000}
      />
    </div>
  );
};

export default CustomerManagementPage;
