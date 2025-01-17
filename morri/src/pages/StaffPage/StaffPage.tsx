import React, { useState, useEffect } from "react";
import "./staff.css";
import { Box } from "@mui/material";
import TableComponent from "../../component/TableComponent/TableComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import Header from "../../component/Title_header/Header";
import AddStaffForm from "./addStaffPage"; 
import Snackbar from "../../component/Snackbar/Snackbar";
import UpdateStaffForm from "./updateStaffPage";
import axios from "axios";


export interface Staff {
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
  { field: "email", headerName: "Email" },
  { field: "dateOfBirth", headerName: "Ngày sinh" },
  { field: "phoneNumber", headerName: "SDT" },
  { field: "cccd", headerName: "CCCD" },
  { field: "address", headerName: "Địa chỉ" },
  { field: "role", headerName: "Chức vụ" },
  { field: "gender", headerName: "Giới tính" },
  { field: "ngayVaoLam", headerName: "Ngày bắt đầu" },
];

type SnackbarSeverity = "success" | "error" | "warning" | "info";

const StaffPage: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
   const [staffID, setStaffID] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("info");
  const [rowClicked, setRowClicked] = useState<Staff | undefined>();

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  useEffect(() => {
    filterStaffs();
  }, [searchKeyword, staffs]);
  const filterStaffs = () => {
    if (!searchKeyword.trim()) {
      setFilteredStaffs(staffs);
      return;
    }

    const keyword = searchKeyword.toLowerCase().trim();
    const filtered = staffs.filter((staff) => {
      return (
        staff.name.toLowerCase().includes(keyword) || staff.username.toLowerCase().includes(keyword) ||
        staff.email?.toLowerCase().includes(keyword) ||
        staff.phoneNumber?.toLowerCase().includes(keyword) ||
        staff.id.toLowerCase().includes(keyword) ||
        formatDate(staff.dateOfBirth).toLowerCase().includes(keyword) ||
        formatDate(staff.ngayVaoLam)
          .toLowerCase()
          .includes(keyword) ||
        (staff.gender === "MALE" ? "Nam" : "Nữ")
          .toLowerCase()
          .includes(keyword) || (staff.role === "SALE_STAFF" ? "Nhân viên bán hàng" : "Nhân viên kho")
          .toLowerCase()
          .includes(keyword)
      );
    });

    setFilteredStaffs(filtered);
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

  const transformedData = filteredStaffs.map((staff) => ({
    ID: staff.id,
    name: staff.name,
    username: staff.username,
    email: staff.email || "N/A",
    dateOfBirth: formatDate(staff.dateOfBirth),
    phoneNumber: staff.phoneNumber || "N/A",
    cccd: staff.cccd || "N/A",
    address: staff.address || "N/A",
    role: formatRole(staff.role),
    gender: staff.gender === "MALE" ? "Nam" : "Nữ",
    ngayVaoLam: formatDate(staff.ngayVaoLam),
    luongCoBan: formatSalary(staff.luongCoBan),
    avaURL: staff.avaURL // This won't be displayed but will be passed to currentData
  }));
  
  const handleSearch = (value: string) => {
    // setSearchKeyword(value.toLowerCase());
    setSearchKeyword(value);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (!rowClicked) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Vui lòng chọn nhân viên để xóa!");
        setSnackbarVisible(true);
        setIsDeleteModalOpen(false);
        return;
      }

      const response = await fetch(`http://localhost:8081/user/${rowClicked.id}`, {
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
        // setRowClicked(null);
      } else {
        throw new Error("Failed to delete staff");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Lỗi khi xóa nhân viên!");
      setSnackbarVisible(true);
      setIsDeleteModalOpen(false);
    }
  };

  const formatToISODate = (dateString: string | number) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toISOString().split("T")[0] + "T00:00:00";
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
      // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM2MTYwMjc2LCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzYxOTYyNzZ9.vIkMqbErDcLNjw0BlxnsI9GyVHWqnWegX5LzGIxUIkk";

      console.log("formdata:", JSON.stringify(formData)); 
      const requestData = {
        name: formData.name,
        username: formData.username,
        email: formData.email || undefined,
        dateOfBirth: formatToISODate(formData.dateOfBirth),
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role,
        gender: formData.gender === "Nam" ? "MALE" : "FEMALE",   
        ngayVaoLam: formData.ngayVaoLam ? formatToISODate(formData.ngayVaoLam) : null,
        luongCoBan: formData.luongCoBan,
        cccd: formData.cccd,
        address: formData.address
    };

    console.log("Request data:", requestData);

    // const axiosConfig = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //         'Accept': 'application/json'
    //     },
    //     validateStatus: function (status: number) {
    //         return status >= 200 && status < 300;  
    //     }
    // };

    const response = await fetch("http://localhost:8081/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const responseData = await response.json(); // Extract the JSON data
    console.log("response product: ", responseData);

    if (response.status === 200 || response.status === 201) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm nhân viên thành công!");
        setSnackbarVisible(true);
        setIsModalOpen(false);
        await fetchStaffs();
    }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Lỗi khi thêm nhân viên!");
      setSnackbarVisible(true);
      console.log("error", error)
      setIsModalOpen(false);
    }
  }; 

  // const handleUpdate = async (updatedStaff: Staff): Promise<void> => {
  //   try {
  //     if (!rowClicked?.id) {
  //       throw new Error("No staff selected");
  //     }
  //     console.log(`http://localhost:8081/user/${rowClicked.id}`)
  //     console.log("updatedStaff : "+JSON.stringify(updatedStaff))
  
  //     const response = await fetch(`http://localhost:8081/user/${rowClicked.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: updatedStaff?.name,
  //         username: updatedStaff.username,
  //         email: updatedStaff.email,
  //         dateOfBirth: updatedStaff.dateOfBirth,
  //         gender: updatedStaff.gender,
  //         phoneNumber: updatedStaff.phoneNumber,
  //         cccd: updatedStaff.cccd,
  //         address: updatedStaff.address,
  //         ngayVaoLam: updatedStaff.ngayVaoLam,
  //         role: updatedStaff.role,
  //         luongCoBan: updatedStaff.luongCoBan,
  //         avaURL: updatedStaff.avaURL
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.log("error", errorData);
  //       throw new Error(errorData.message || "Failed to update staff");
  //     }
  
  //     setSnackbarSeverity("success");
  //     setSnackbarMessage("Cập nhật nhân viên thành công!");
  //     setSnackbarVisible(true);
  //     setIsModalUpdateOpen(false);
  //     await fetchStaffs();
  //   } catch (error) {
  //     setSnackbarSeverity("error");
  //     setSnackbarMessage(
  //       error instanceof Error ? error.message : "Error cập nhật nhân viên!"
  //     );
  //     setSnackbarVisible(true);
  //     setIsModalUpdateOpen(false);
  //   }
  // };
  const handleUpdate = async (formData: any): Promise<void> => {
    try {
      if (!rowClicked?.id) {
        throw new Error("No staff selected");
      }
  
      const formatDate = (dateString: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString();
      };
  
      const updatedStaff = {
        name: formData.name || rowClicked.name,
        username: formData.username || rowClicked.username,
        email: formData.email || rowClicked.email,
        dateOfBirth: formData.dateOfBirth ? formatDate(formData.dateOfBirth) : rowClicked.dateOfBirth,
        gender: formData.gender || rowClicked.gender,
        phoneNumber: formData.phoneNumber || rowClicked.phoneNumber,
        cccd: formData.cccd || rowClicked.cccd,
        address: formData.address || rowClicked.address,
        ngayVaoLam: formData.ngayVaoLam ? formatDate(formData.ngayVaoLam) : rowClicked.ngayVaoLam,
        role: formData.role || rowClicked.role,
        luongCoBan: formData.luongCoBan || rowClicked.luongCoBan,
        avaURL: formData.avaURL || rowClicked.avaURL,
        id: rowClicked.id // Keep the original ID
      };
  
      const response = await fetch(`http://localhost:8081/user/${rowClicked.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStaff),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update staff");
      }
  
      setSnackbarSeverity("success");
      setSnackbarMessage("Cập nhật nhân viên thành công!");
      setSnackbarVisible(true);
      setIsModalUpdateOpen(false);
      await fetchStaffs();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error instanceof Error ? error.message : "Error cập nhật nhân viên!"
      );
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
        // onRowClick={(row) => console.log("Row clicked:", row)}
        //   onEdit={(row) => {
        //     const staffToEdit = staffs.find(staff => staff.id === row.id) || null;
        //     console.log("editting", staffToEdit);
        //     setSelectedStaff(staffToEdit);
        //     setIsModalUpdateOpen(true);
        //   }}
        onRowClick={(row) => {
          console.log("row: " + JSON.stringify(row));
          setRowClicked({
            id: row.ID,
            name: row.name,
            username: row.username,
            email: row.email,
            dateOfBirth: row.dateOfBirth,
            phoneNumber: row.phoneNumber,
            role: row.role,
            gender: row.gender === "Nam" ? "MALE" : "FEMALE",
            ngayVaoLam: row.ngayVaoLam,
            luongCoBan: row.luongCoBan,
            cccd: row.cccd,
            address: row.address,
            avaURL: row.avaURL, // This will be passed to UpdateStaffForm
          });
        }}
        onEdit={(row) => setIsModalUpdateOpen(true)}
          onDelete={(row) => setIsDeleteModalOpen(true)}
      />

      <AddStaffForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAdd={handleAdd}
      />

          <UpdateStaffForm
            isModalOpen={isModalUpdateOpen}
            setIsModalOpen={setIsModalUpdateOpen}
            currentData={rowClicked}
            handleUpdate={handleUpdate}
          />
          <DeleteComponent
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            deleteName={rowClicked?.name || ''}
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

export default StaffPage;