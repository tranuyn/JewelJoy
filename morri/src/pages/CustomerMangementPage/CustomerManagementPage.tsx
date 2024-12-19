import React, { useState } from "react";
import "./customer.css";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import { Box } from "@mui/material";
import TableComponent from "../../component/TableComponent/TableComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import AddCustomer from "./addCustomer";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import UpdateCustomer from "./updateCustomer";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
interface Column {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "center" | "right";
}
const columns: Column[] = [
  { field: "name", headerName: "Tên khách hàng" },
  { field: "dateOfBirth", headerName: "Ngày sinh" },
  { field: "phoneNumber", headerName: "SDT" },
  { field: "orderCount", headerName: "SL bán" },

  { field: "gender", headerName: "Giới tính" },

  { field: "registrationDate", headerName: "Ngày đăng ký" },
];

const data = [
  {
    name: "Jack",
    dateOfBirth: "10/10/2024",
    phoneNumber: "089374984",
    orderCount: 10,
    gender: "Nữ",

    registrationDate: "10/10/2024",
  },
  {
    name: "Jack",
    dateOfBirth: "10/10/2024",
    phoneNumber: "089374984",
    orderCount: 10,
    gender: "Nữ",

    registrationDate: "10/10/2024",
  },
  {
    name: "Jack",
    dateOfBirth: "10/10/2024",
    phoneNumber: "089374984",
    orderCount: 10,
    gender: "Nữ",

    registrationDate: "10/10/2024",
  },
];

const CustomerManagementPage: React.FC = () => {
  // const [activeTab, setActiveTab] = useState<"sell" | "buy">("sell");
  const [activeTab, setActiveTab] = useState<string>("Khách hàng bán");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };
  const tabs = ["Khách hàng bán", "Khách hàng mua"];
  const handleDelete = async (): Promise<void> => {
    try {
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    try {
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
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
          btnText={"Thêm nhân viên"}
          onClick={() => setIsModalOpen(true)}
        />
        <AddCustomer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Box sx={{ marginRight: "300px" }}>
          <TabBar
            tabs={tabs}
            onTabChange={setActiveTab}
            defaultTab="Khách hàng bán"
            styleType="custom"
          />{" "}
        </Box>
        <SearchComponent
          placeholder={"Search customers..."}
          keyword={searchKeyword}
          onSearch={handleSearch}
        />
      </Box>
      <div style={{ padding: "10px" }}></div>
      <TableComponent
        columns={columns}
        data={data}
        onRowClick={(row) => console.log("Row clicked:", row)}
        onEdit={(row) => setIsModalUpdateOpen(true)}
        onDelete={(row) => setIsDeleteModalOpen(true)}
      />

      <UpdateCustomer
        isModalOpen={isModalUpdateOpen}
        setIsModalOpen={setIsModalUpdateOpen}
        handleUpdate={handleUpdate}
      />
      <DeleteComponent
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteName={"Jack"}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default CustomerManagementPage;
