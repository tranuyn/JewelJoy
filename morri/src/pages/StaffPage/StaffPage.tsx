import React, { useState, useEffect } from "react";
import "./staff.css";
import { Box } from "@mui/material";
import TableComponent from "../../component/TableComponent/TableComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import Header from "../../component/Title_header/Header";
import AddStaffForm from "./addStaffPage";
import UpdateStaffForm from "./updateStaffPage";
import Snackbar from "../../component/Snackbar/Snackbar";

interface Staff {
  id: string;
  username: string;
  email: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  cccd: string;
  address: string;
  ngayVaoLam: string | null;
  role: string;
  luongCoBan: string | null;
  avaURL: string | null;
}

const columns = [
  { field: "name", headerName: "Tên nhân viên" },
  { field: "username", headerName: "Tên đăng nhập" },
  { field: "dateOfBirth", headerName: "Ngày sinh" },
  { field: "phoneNumber", headerName: "SDT" },
  { field: "role", headerName: "Chức vụ" },
  { field: "gender", headerName: "Giới tính" },
  { field: "ngayVaoLam", headerName: "Ngày bắt đầu" },
  { field: "luongCoBan", headerName: "Lương cơ bản" },
];

type SnackbarSeverity = "success" | "error" | "warning" | "info";

const StaffPage: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("info");

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  const fetchStaffs = async () => {
    try {
      const response = await fetch(`http://localhost:8081/user/`);
      const data = await response.json();
      setStaffs(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching staff:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Lỗi khi tải danh sách nhân viên!");
      setSnackbarVisible(true);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatRole = (role: string) => {
    const roleMap: { [key: string]: string } = {
      ADMIN: "Quản trị viên",
      SALE_STAFF: "Nhân viên bán hàng",
      INVENTORY_STAFF: "Nhân viên kho",
    };
    return roleMap[role] || role;
  };

  const formatSalary = (salary: string | null) => {
    if (!salary) return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(salary));
  };

  const transformedData = staffs.map((staff) => ({
    name: staff.name,
    username: staff.username,
    dateOfBirth: formatDate(staff.dateOfBirth),
    phoneNumber: staff.phoneNumber,
    role: formatRole(staff.role),
    gender: staff.gender === "MALE" ? "Nam" : "Nữ",
    ngayVaoLam: formatDate(staff.ngayVaoLam),
    luongCoBan: formatSalary(staff.luongCoBan),
  }));
  const handleSearch = (value: string) => {
    setSearchKeyword(value.toLowerCase());
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (selectedStaff) {
        const response = await fetch(`http://localhost:8080/user/${selectedStaff.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Xóa nhân viên thành công!");
          setSnackbarVisible(true);
          setIsDeleteModalOpen(false);
          await fetchStaffs();
        } else {
          throw new Error("Failed to delete staff");
        }
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Vui lòng chọn nhân viên để xóa!");
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Lỗi khi xóa nhân viên!");
      setSnackbarVisible(true);
      setIsDeleteModalOpen(false);
    }
  };

  const handleAdd = async (formData: {
    name: string | number;
    username: string | number;
    phoneNumber: string | number;
    gender: string | number;
    dateOfBirth: string | number;
    email: string | number;
    ngayVaoLam?: string | number;
    luongCoBan: string | number;
    password: string | number;
    cccd: string | number;
    address: string | number;
    role: string | number; }
  ): Promise<void> => {
    try {
      console.log("formdata:", formData);
      const formatDate = (dateString: string | number) => {
        if (typeof dateString === 'string') {
            return dateString + 'T00:00:00';
        }
        return dateString;
    };

      const response = await fetch("http://localhost:8081/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          dateOfBirth:  formData.ngayVaoLam ? formatDate(formData.dateOfBirth) : undefined  ,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: formData.role,
          gender: formData.gender,
          ngayVaoLam: formData.ngayVaoLam ? formatDate(formData.ngayVaoLam) : undefined,
          luongCoBan: formData.luongCoBan,
        }),
      });
      console.log("response :", response);

 
      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm nhân viên thành công!");
        setSnackbarVisible(true);
        setIsModalOpen(false);
        await fetchStaffs();
      } else {
        throw new Error("Failed to add staff");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Lỗi khi thêm nhân viên!");
      setSnackbarVisible(true);
      setIsModalOpen(false);
    }
  };

  const handleUpdate = async (formData: Staff): Promise<void> => {
    try {
      if (selectedStaff) {
        const response = await fetch(`http://localhost:8080/user/${selectedStaff.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Cập nhật nhân viên thành công!");
          setSnackbarVisible(true);
          setIsModalUpdateOpen(false);
          await fetchStaffs();
        } else {
          throw new Error("Failed to update staff");
        }
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Lỗi khi cập nhật nhân viên!");
      setSnackbarVisible(true);
      setIsModalUpdateOpen(false);
    }
  };

  return (
    <div className="staff-management">
      <Header title="Quản lý nhân viên" />
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
          btnText="Thêm nhân viên"
          onClick={() => setIsModalOpen(true)}
        />
        <SearchComponent
          placeholder="Tìm kiếm nhân viên..."
          keyword={searchKeyword}
          onSearch={handleSearch}
        />
      </Box>
      <div style={{ padding: "10px" }}></div>
      <TableComponent
        columns={columns}
        data={transformedData}
        // onRowClick={(row) => setSelectedStaff(staffs.find(staff => staff.id === row.id) || null)}
        // onEdit={(row) => {
        //   setSelectedStaff(staffs.find(staff => staff.id === row.id) || null);
        //   setIsModalUpdateOpen(true);
        // }}
        // onDelete={(row) => {
        //   setSelectedStaff(staffs.find(staff => staff.id === row.id) || null);
        //   setIsDeleteModalOpen(true);
        // }}
        onRowClick={(row) => console.log("Row clicked:", row)}
          onEdit={(row) => setIsModalUpdateOpen(true)}
          onDelete={(row) => setIsDeleteModalOpen(true)}
      />

      <AddStaffForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAdd={handleAdd}
      />

      {selectedStaff && (
        <>
          {/* <UpdateStaffForm
            isModalOpen={isModalUpdateOpen}
            setIsModalOpen={setIsModalUpdateOpen}
            initialData={selectedStaff}
            handleUpdate={handleUpdateModal}
          /> */}
          <DeleteComponent
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            deleteName={selectedStaff.name}
            handleDelete={handleDelete}
          />
        </>
      )}

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

export default StaffPage;