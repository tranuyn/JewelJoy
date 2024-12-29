import React, { useState } from "react";
import "./service.css";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import { Box } from "@mui/material";
import TableComponent from "../../component/TableComponent/TableComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
// import AddService from "./addService";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
// import UpdateCustomer from "./updateCustomer";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";

interface Column {
    field: string;
    headerName: string;
    width?: number;
    align?: "left" | "center" | "right";
  }
  
  // Cấu hình cột cho từng tab
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
  
  // Dữ liệu mẫu cho từng tab
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
    {
      serviceCode: "DV003",
      serviceName: "Chăm sóc da",
      price: "800,000 VND",
      description: "Trẻ hóa và làm sáng da",
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
  
const ServicePage:React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("Dịch vụ");
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
            btnText={"Thêm dịch vụ"}
            onClick={() => setIsModalOpen(true)}
          />
          {/* <AddCustomer
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          /> */}
          <Box sx={{ marginRight: "300px" }}>
            <TabBar
              tabs={tabs}
              onTabChange={setActiveTab}
              defaultTab="Dịch vụ"
              styleType="custom"
            />{" "}
          </Box>
          <SearchComponent
            placeholder={"Tìm kiếm dịch vụ..."}
            keyword={searchKeyword}
            onSearch={handleSearch}
          />
        </Box>
        <div style={{ padding: "10px" }}></div>
        <TableComponent
          columns={serviceColumns}
          data={serviceData}
          onRowClick={(row) => console.log("Row clicked:", row)}
          onEdit={(row) => setIsModalUpdateOpen(true)}
          onDelete={(row) => setIsDeleteModalOpen(true)}
        />
  
        {/* <UpdateCustomer
          isModalOpen={isModalUpdateOpen}
          setIsModalOpen={setIsModalUpdateOpen}
          handleUpdate={handleUpdate}
        /> */}
        <DeleteComponent
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          deleteName={"Jack"}
          handleDelete={handleDelete}
        />
      </div>
    );
};

export default ServicePage