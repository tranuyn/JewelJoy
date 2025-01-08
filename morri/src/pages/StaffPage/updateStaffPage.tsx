import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WorkIcon from '@mui/icons-material/Work';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardIcon from '@mui/icons-material/CardMembership';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { Staff} from "./StaffPage";

interface StaffProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: (formData: FormData) => Promise<void>;
  initialData: Staff | null;
}

interface FormData {
  name: string | number;
  username: string | number;
  email: string | number;
  dateOfBirth: string | number;
  gender: string | number;
  phoneNumber: string | number;
  cccd: string | number;
  address: string | number;
  ngayVaoLam?: string | number;
  role: string | number;
  luongCoBan: string | number;
}


const UpdateStaffForm: React.FC<StaffProps> = ({ 
  isModalOpen,
  setIsModalOpen,
  initialData,
  handleUpdate,
}) => {
  console.log("Initial data: " + JSON.stringify(initialData));
   const [name, setName] = useState<string | number>(initialData?.name || "");
   const [username, setUserName] = useState<string | number>(initialData?.username || "");
    const [phoneNumber, setPhoneNumber] = useState<string | number>(
      initialData?.phoneNumber || ""
    );
    const [gender, setGender] = useState<string | number>(
      initialData?.gender || ""
    );
    const [dateOfBirth, setDateOfBirth] = useState<string | number>(
      initialData?.dateOfBirth || ""
    );
    const [email, setEmail] = useState<string | number>(initialData?.email || "");
    const [ngayVaoLam, setNgayVaoLam] = useState<string | number>(
      initialData?.ngayVaoLam || new Date().toISOString().split("T")[0]
    );
    const [luongCoBan, setLuongCoBan] = useState<string | number>(
      initialData?.luongCoBan || ""
    );
    const [address, setAddress] = useState<string | number>(
      initialData?.address || ""
    );
    const [role, setRole] = useState<string | number>(
      initialData?.role || ""
    );
    const [cccd, setCccd] = useState<string | number>(
      initialData?.cccd || ""
    );
    const [isLoading, setLoading] = useState(false);
  
    const handleUpdateModal = async () => {
      const formData: FormData = {
        name,
        username,
        email,
        cccd,
        phoneNumber,
        gender,
        dateOfBirth,
        address,
        ngayVaoLam,
        role,
        luongCoBan,
      };
  
      setLoading(true);
      try {
        await handleUpdate(formData);
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 6,
          borderRadius: 2,
          width: "90%",
          maxWidth: "800px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#264850",
            textAlign: "center",
          }}
        >
          Cập nhật nhân viên
        </div>

        <Box sx={{ display: "flex" }}>
          {/* Left side - Avatar section */}
          <Box sx={{ 
            width: "200px",
            marginRight: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
          }}>
            <Box sx={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              marginBottom: "12px",
              marginLeft: "20px",
              overflow: "hidden"
            }}>
              {/* {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box sx={{ width: "100%", height: "100%", backgroundColor: "#E0E0E0" }} />
              )} */}
            </Box>
            <label htmlFor="upload-photo">
              {/* <input
                style={{ display: "none" }}
                id="upload-photo"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              /> */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  backgroundColor: "#264850",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginBottom: "30px",
                  marginTop: "10px",
                  width: "130px",
                  marginLeft: "30px",
                }}
                onClick={() => document.getElementById("upload-photo")?.click()}
              >
                <PhotoCameraIcon style={{ fontSize: "20px" }} />
                Chọn ảnh
              </button>
            </label>
            <Box sx={{ width: "100%", marginBottom: "10px" }}>
              <TextBox
                datatype="date"
                title="Ngày sinh"
                placeholder="Nhập ngày sinh"
                // onChange={(value) => {}}
                value={dateOfBirth}
                icon={<CakeIcon style={{ color: "black" }} />}
                // defaultValue={staffData?.dateOfBirth}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextBox
                datatype="date"
                title="Ngày vào làm"
                placeholder="Nhập ngày vào làm"
                value={ngayVaoLam}
                // onChange={setPhoneNumber}
                // defaultValue={initialData?.ngayVaoLam}  
                icon={<WorkIcon style={{ color: "black" }} />}
                // defaultValue={staffData?.startDate}
              />
            </Box>
          </Box>

          {/* Right side - Form fields */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "8px"
            }}>
              <TextBox
                datatype="string"
                title="Tên"
                placeholder="Nhập tên nhân viên"
                value={name}
                onChange={setName}
                defaultValue={initialData?.name}  
                // defaultValue={staffData?.name}
              />
              <TextBox
                datatype="string"
                title="CCCD"
                placeholder="Nhập CCCD"
                value={cccd}
                onChange={setCccd}
                defaultValue={initialData?.cccd}  
                icon={<CardIcon style={{ color: "black" }} />}
                // defaultValue={staffData?.cccd}
              />
            </Box>

            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "8px"
            }}>
              <TextBox
                datatype="string"
                title="Email"
                placeholder="Nhập Email"
                value={email}
                onChange={setEmail}
                defaultValue={initialData?.email}  
                icon={<EmailIcon style={{ color: "black" }} />}
                // defaultValue={staffData?.email}
              />
              <TextBox
                datatype="string"
                title="SDT"
                placeholder="Nhập SDT"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultValue={initialData?.phoneNumber}      
                icon={<PhoneIcon style={{ color: "black" }} />}
                // defaultValue={staffData?.phoneNumber}
              />
            </Box>

            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "8px"
            }}>
              <TextBox
                datatype="select"
                title="Chức vụ"
                placeholder="Chọn chức vụ"
                value={role}
                onChange={setRole}
                defaultValue={initialData?.role === "MALE" ? "Nam" : "Nữ"}
                options={[
                  { label: "Nhân viên", value: "staff" },
                  { label: "Quản lý", value: "manager" },
                ]}
              />
              <TextBox
                datatype="select"
                title="Giới tính"
                placeholder="Chọn giới tính"
                value={gender}
                onChange={setGender}
                defaultValue={initialData?.gender === "MALE" ? "Nam" : "Nữ"}             
                options={[
                  { label: "Nam", value: "male" },
                  { label: "Nữ", value: "female" },
                ]}
                icon={<PersonIcon style={{ color: "black" }} />}
                // defaultValue={staffData?.gender}
              />
            </Box>

            <TextBox
              datatype="string"
              title="Địa chỉ"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={setAddress}
              defaultValue={initialData?.address}         
              icon={<LocationOnIcon style={{ color: "black" }} />}
              // defaultValue={staffData?.address}
            />
          </Box>
        </Box>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: "16px", 
          marginTop: "24px"
        }}>
          <BtnComponent
            btnColorType="primary"
            btnText="Cập nhật"
            onClick={handleUpdateModal}
          />
          <BtnComponent
            btnColorType="close"
            btnText="Đóng"
            onClick={() => setIsModalOpen(false)}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateStaffForm;