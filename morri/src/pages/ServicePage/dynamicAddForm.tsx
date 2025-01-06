import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface DynamicAddFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formType: string; 
}

const DynamicAddForm: React.FC<DynamicAddFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  formType,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderFormFields = () => {
    if (formType === "Dịch vụ") {
      return (
        <>
        <Box sx={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr",  gap: "0 0px" }}>
          {/* Chức năng chọn ảnh để upload */}
          <Box sx={{ display: "flex", gap: "0px", marginBottom: "8px" }}>
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
          <Box>
        <TextBox
            datatype="string"
            title="Mã dịch vụ *"
            placeholder="Nhập mã dịch vụ"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="string"
            title="Tên dịch vụ *"
            placeholder="Nhập tên dịch vụ"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="number"
            title="Số tiền *"
            placeholder="Nhập số tiền"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="string"
            title="Mô tả"
            placeholder="Nhập mô tả dịch vụ"
            onChange={(value) => {}}
            defaultValue=""
          />
          
          </Box>
        </Box>
        </>
      );
    } else if (formType === "Đặt lịch") {
      return (
        <>
          <TextBox
            datatype="string"
            title="Tên khách hàng *"
            placeholder="Nhập tên khách hàng"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="string"
            title="Số điện thoại *"
            placeholder="Nhập số điện thoại"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="string"
            title="Mã dịch vụ *"
            placeholder="Nhập mã dịch vụ"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="string"
            title="Giới tính"
            placeholder="Nhập giới tính"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="date"
            title="Ngày đăng ký *"
            placeholder="Chọn ngày đăng ký"
            onChange={(value) => {}}
            defaultValue=""
          />
        </>
      );
    }
    return null; // Return null for any other tab value
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
          padding: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#264850",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Thêm {formType}
        </div>
        {renderFormFields()}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 3 }}>
          <BtnComponent
            btnColorType="close"
            btnText="Đóng"
            onClick={() => setIsModalOpen(false)}
          />
          <BtnComponent
            btnColorType="primary"
            btnText="Thêm"
            onClick={() => {}}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicAddForm;