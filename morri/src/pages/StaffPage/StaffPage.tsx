import React, { useState } from "react";
import "./staff.css";
import { Box } from "@mui/material";
import TableComponent from "../../component/TableComponent/TableComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import Header from "../../component/Title_header/Header";
import AddStaffForm from "./addStaffPage";
import UpdateStaffForm from "./updateStaffPage";

interface Column {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "center" | "right";
}

const columns: Column[] = [
  { field: "name", headerName: "Tên nhân viên" },
  { field: "dateOfBirth", headerName: "Ngày sinh" },
  { field: "phoneNumber", headerName: "SDT" },
  { field: "position", headerName: "Chức vụ" },
  { field: "gender", headerName: "Giới tính" },
  { field: "startDate", headerName: "Ngày bắt đầu" },
];

const data = [
  {
    name: "Alice",
    dateOfBirth: "05/05/1990",
    phoneNumber: "0123456789",
    position: "Quản lý",
    gender: "Nữ",
    startDate: "01/01/2020",
  },
  {
    name: "Bob",
    dateOfBirth: "10/10/1985",
    phoneNumber: "0987654321",
    position: "Nhân viên",
    gender: "Nam",
    startDate: "15/03/2021",
  },
];

const StaffPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      // Implement delete logic here
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    try {
      // Implement update logic here
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  return (
    <div className="staff-management">
      <Header title="Quản lý nhân viên" />
      <div style={{ padding: "10px" }}></div>
      {/* <Box sx={{ padding: "20px" }}>
        <Header title="Quản lý nhân viên" /> */}
        
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
            btnText="Thêm nhân viên"
            onClick={() => setIsModalOpen(true)}
          />
          <AddStaffForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          />
          
          <SearchComponent
            placeholder="Search staff..."
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

        <DeleteComponent
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          deleteName="Alice"
          handleDelete={handleDelete}
        />
        <UpdateStaffForm
          isModalOpen={isModalUpdateOpen}
          setIsModalOpen={setIsModalUpdateOpen}
        />
      {/* </Box> */}
    </div>
  );
};

export default StaffPage;