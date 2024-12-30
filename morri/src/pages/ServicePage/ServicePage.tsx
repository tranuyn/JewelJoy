
import React, { useState } from "react";
import "./service.css";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import { Box } from "@mui/material";
import TableComponent from "../../component/TableComponent/TableComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import DynamicAddForm from "./dynamicAddForm";
import DynamicUpdateForm from "./dynamicUpdateForm";

interface Column {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "center" | "right";
}

const serviceColumns: Column[] = [
  { field: "serviceCode", headerName: "Mã dịch vụ" },
  { field: "serviceName", headerName: "Tên dịch vụ" },
  { field: "price", headerName: "Số tiền" },
  { field: "description", headerName: "Mô tả" },
];

const bookingColumns: Column[] = [
  { field: "customerName", headerName: "Tên khách hàng" },
  { field: "registrationDate", headerName: "Ngày đăng ký" },
  { field: "serviceCode", headerName: "Mã dịch vụ" },
  { field: "serviceStatus", headerName: "Tình trạng dịch vụ" },
  { field: "gender", headerName: "Giới tính" },
  { field: "phoneNumber", headerName: "SĐT" },
];

const serviceData = [
  {
    serviceCode: "DV001",
    serviceName: "Massage",
    price: "500,000 VND",
    description: "Thư giãn toàn thân",
  },
  {
    serviceCode: "DV002",
    serviceName: "Xông hơi",
    price: "300,000 VND",
    description: "Làm sạch và thư giãn cơ thể",
  },
];

const bookingData = [
  {
    customerName: "Nguyễn Văn A",
    registrationDate: "20/12/2024",
    serviceCode: "DV001",
    serviceStatus: "Đã hoàn thành",
    gender: "Nam",
    phoneNumber: "091234567",
  },
  {
    customerName: "Trần Thị B",
    registrationDate: "21/12/2024",
    serviceCode: "DV002",
    serviceStatus: "Đang xử lý",
    gender: "Nữ",
    phoneNumber: "098765432",
  },
];

const ServicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Dịch vụ");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const tabs = ["Dịch vụ", "Đặt lịch"];

  const handleDelete = async (): Promise<void> => {
    try {
      // Implement delete logic here
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // const handleUpdate = async (): Promise<void> => {
  //   try {
  //     // Implement update logic here
  //   } catch (error) {
  //     console.error("Error updating:", error);
  //   }
  // };

  const handleUpdate = async (): Promise<void> => {
    try {
      // Implement your update logic here
      console.log("Updating row:", selectedRow);
      // After successful update:
      setIsModalUpdateOpen(false);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setIsModalUpdateOpen(true);
  };

  // Function to get the appropriate columns based on active tab
  const getColumns = () => {
    switch (activeTab) {
      case "Đặt lịch":
        return bookingColumns;
      default:
        return serviceColumns;
    }
  };

  // Function to get the appropriate data based on active tab
  const getData = () => {
    switch (activeTab) {
      case "Đặt lịch":
        return bookingData;
      default:
        return serviceData;
    }
  };

  return (
    <div className="service-page">
      <Header title="Quản lý dịch vụ" />
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
          btnText={`Thêm ${activeTab.toLowerCase()}`}
          onClick={() => setIsModalOpen(true)}
        />
        <DynamicAddForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formType={activeTab}
        />
        <Box sx={{ marginRight: "300px" }}>
          <TabBar
            tabs={tabs}
            onTabChange={setActiveTab}
            defaultTab="Dịch vụ"
            styleType="custom"
          />
        </Box>
        <SearchComponent
          placeholder={`Tìm kiếm ${activeTab.toLowerCase()}...`}
          keyword={searchKeyword}
          onSearch={handleSearch}
        />
      </Box>
      <div style={{ padding: "10px" }}></div>
      {/* <TableComponent
        columns={getColumns()}
        data={getData()}
        onRowClick={(row) => console.log("Row clicked:", row)}
        onEdit={(row) => setIsModalUpdateOpen(true)}
        onDelete={(row) => setIsDeleteModalOpen(true)}
      /> */}
<TableComponent
        columns={getColumns()}
        data={getData()}
        onRowClick={(row) => console.log("Row clicked:", row)}
        onEdit={handleEdit}
        onDelete={(row) => setIsDeleteModalOpen(true)}
      />

      <DynamicUpdateForm
        isModalOpen={isModalUpdateOpen}
        setIsModalOpen={setIsModalUpdateOpen}
        formType={activeTab}
        handleUpdate={handleUpdate}
        currentData={selectedRow}
      />
      <DeleteComponent
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteName={activeTab}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ServicePage;