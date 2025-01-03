import React, { useState, ChangeEvent } from "react";
import { Box } from "@mui/material";
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
import KeyIcon from '@mui/icons-material/Key';
import Header from "../../component/Title_header/Header";
import "./setting.css";

const SettingPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setSelectedImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    
    <div className="hehee">
      <Header title="User Profile" />
      <div style={{ padding: "10px" }}></div>
      <div className="setting-page">
      <Box sx={{ display: "flex", gap: "24px", marginBottom: "8px" }} >
      {/* Box for Avatar and Button */}
      <Box sx={{ display: "flex", gap: "24px", marginBottom: "8px" }}>
        <Box sx={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <Box sx={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            marginBottom: "30px",
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
            <input
              style={{ display: "none" }}
              id="upload-photo"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
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
              }}
              onClick={() => document.getElementById("upload-photo")?.click()}
            >
              <PhotoCameraIcon style={{ fontSize: "20px" }} />
              Chọn ảnh
            </button>
          </label>
        </Box>
      </Box>
      {/* Box for Name, CCCD, Email, and SDT */}
      <Box sx={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr",  gap: "0 24px" }}>
          <TextBox
            datatype="string"
            title="Tên"
            placeholder="Nhập tên nhân viên"
            onChange={(value) => {}}
          />
          <TextBox
            datatype="string"
            title="CCCD"
            placeholder="Nhập CCCD"
            onChange={(value) => {}}
            icon={<CardIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="string"
            title="Email"
            placeholder="Nhập Email"
            onChange={(value) => {}}
            icon={<EmailIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="string"
            title="SDT"
            placeholder="Nhập SDT"
            onChange={(value) => {}}
            icon={<PhoneIcon style={{ color: "black" }} />}
          />
        </Box>
      </Box>


      {/* Box for Birthday, Position, and Gender */}
      <Box sx={{ display: "grid",gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "8px" }}>
        <TextBox
          datatype="date"
          title="Ngày sinh"
          placeholder="02/11/2004"
          onChange={(value) => {}}
          icon={<CakeIcon style={{ color: "black" }} />}
        />
        <TextBox
          datatype="select"
          title="Chức vụ"
          placeholder="Chọn chức vụ"
          onChange={(value) => {}}
          options={[
            { label: "Nhân viên", value: "staff" },
          ]}
        />
        <TextBox
          datatype="select"
          title="Giới tính"
          placeholder="Chọn giới tính"
          onChange={(value) => {}}
          options={[
            { label: "Nam", value: "male" },
            { label: "Nữ", value: "female" },
          ]}
          icon={<PersonIcon style={{ color: "black" }} />}
        />
      </Box>

      {/* Box for Joining Date and Address */}
      <Box sx={{ display: "grid",gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "8px" }}>
        <TextBox
          datatype="date"
          title="Ngày vào làm"
          placeholder="02/11/2024"
          onChange={(value) => {}}
          icon={<WorkIcon style={{ color: "black" }} />}
        />
        <TextBox
          datatype="string"
          title="Địa chỉ"
          placeholder="Nhập địa chỉ"
          onChange={(value) => {}}
          icon={<LocationOnIcon style={{ color: "black" }} />}
        />
      </Box>

      {/* Box for Old and New Passwords */}
      <Box sx={{ display: "grid",gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "8px" }}>
        <TextBox
          datatype="string"
          title="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ"
          onChange={(value) => {}}
          icon={<KeyIcon style={{ color: "black" }} />}
        />
        <TextBox
          datatype="string"
          title="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          onChange={(value) => {}}
          icon={<KeyIcon style={{ color: "black" }} />}
        />
      </Box>

      {/* Box for Confirm Password */}
      <Box sx={{ display: "grid",gridTemplateColumns: "repeat(1, 1fr)",}}>
        <TextBox
          datatype="string"
          title="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu mới"
          onChange={(value) => {}}
          icon={<KeyIcon style={{ color: "black" }} />}
        />
      </Box>

      {/* Box for Buttons */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        gap: "16px", 
        marginTop: "10px",
        marginBottom: "20px",
      }}>
        <BtnComponent
          btnColorType="primary"
          btnText="Lưu"
          onClick={() => {}}
        />
        <BtnComponent
          btnColorType="close"
          btnText="Đóng"
          onClick={() => {}}
        />
      </Box>
      </div>
    </div>
  );
};

export default SettingPage;
