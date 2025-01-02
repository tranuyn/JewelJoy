import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WorkIcon from '@mui/icons-material/Work';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardIcon from '@mui/icons-material/CardMembership';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import TransgenderIcon from "@mui/icons-material/Transgender";

interface Staff {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAdd: (formData: FormData) => Promise<void>;
}

interface FormData {
  name: string | number;
  username: string | number;
  password : string | number;
  phoneNumber: string | number;
  gender: string | number;
  dateOfBirth: string | number;
  email: string | number;
  ngayVaoLam?: string | number;
  luongCoBan: string | number;
  cccd: string | number;
  address: string | number;
  role: string | number;
}

const AddStaffForm: React.FC<Staff> = ({ 
  isModalOpen, 
  setIsModalOpen, 
  handleAdd 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | number>(""); // Tên đăng nhập
  const [password,setPassword] = useState<string|number>("");
  const [name, setName] = useState<string | number>(""); // Tên đầy đủ của người dùng
  const [phoneNumber, setPhoneNumber] = useState<string | number>(""); // Số điện thoại
  const [gender, setGender] = useState<string | number>("");
  const [dateOfBirth, setDateOfBirth] = useState<string | number>(""); // Ngày sinh (định dạng ISO hoặc chuỗi)
  const [email, setEmail] = useState<string | number>(""); // Email
  const [cccd, setCccd] = useState<string | number>(""); // CCCD (Căn cước công dân)
  const [avaURL, setAvaURL] = useState<string | number>(""); // URL ảnh đại diện
  const [address, setAddress] = useState<string | number>(""); // Địa chỉ
  const [ngayVaoLam, setNgayVaoLam] = useState<string | number>(new Date().toISOString().split("T")[0]); // Ngày vào làm
  const [role, setRole] = useState<string | number>(""); // Vai trò
  const [luongCoBan, setLuongCoBan] = useState<string | number>("");; // Lương cơ bản
  const [isLoading, setLoading] = useState(false);

  const handleAddModal = async () => {
    const formData: FormData = {
      name,
      username,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      email,
      ngayVaoLam,
      luongCoBan,
      cccd,
      address,
      role,
    };

    setLoading(true);
    try {
      await handleAdd(formData);
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
          Thêm nhân viên
        </div>

        <Box sx={{ display: "flex" }}>
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
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box sx={{ width: "100%", height: "100%", backgroundColor: "#E0E0E0" }} />
              )}
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
                placeholder="02/11/2004"
                onChange={setDateOfBirth} 
                icon={<CakeIcon style={{ color: "black" }} />}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextBox
                datatype="date"
                title="Ngày vào làm"
                placeholder="02/11/2024"
                onChange={setNgayVaoLam}
                icon={<WorkIcon style={{ color: "black" }} />}
              />
            </Box>
          </Box>

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
                onChange={setName}
              />
              <TextBox
                datatype="string"
                title="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                onChange={setUsername}
              />
               <TextBox
                datatype="string"
                title="Mật khẩu"
                placeholder="Nhập mật khẩu"
                onChange={setPassword}
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
                title="CCCD"
                placeholder="Nhập CCCD"
                onChange={setCccd}
                icon={<CardIcon style={{ color: "black" }} />}
              />
              <TextBox
                datatype="string"
                title="Email"
                placeholder="Nhập Email"
                onChange={setEmail}
                icon={<EmailIcon style={{ color: "black" }} />}
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
                title="SDT"
                placeholder="Nhập SDT"
                onChange={setPhoneNumber}
                icon={<PhoneIcon style={{ color: "black" }} />}
              />
              <TextBox
                datatype="select"
                title="Giới tính"
                placeholder="Chọn giới tính"
                onChange={setGender}
                icon={<TransgenderIcon style={{ color: "black" }} />}
                options={[
                  { label: "Nam", value: "MALE" },
                  { label: "Nữ", value: "FEMALE" },
                ]}
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
                onChange={setRole}
                options={[
                  { label: "Nhân viên bán hàng", value: "SALE_STAFF" },
                  { label: "Nhân viên kho", value: "INVENTORY_STAFF" },
                  { label: "Quản trị viên", value: "ADMIN" },
                ]}
              />
              <TextBox
                datatype="string"
                title="Lương cơ bản"
                placeholder="Nhập lương cơ bản"
                onChange={setLuongCoBan}
              />
            </Box>

            <TextBox
              datatype="string"
              title="Địa chỉ"
              placeholder="Nhập địa chỉ"
              onChange={setAddress}
              icon={<LocationOnIcon style={{ color: "black" }} />}
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
            btnText="Lưu"
            onClick={handleAddModal}
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

export default AddStaffForm;