import React, { useState, useEffect } from "react";
import { Avatar, Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardIcon from '@mui/icons-material/CardMembership';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { uploadImages } from "../../services/cloudinaryService";
import { Staff } from "../StaffPage/StaffPage";
import { useAuth } from "../../services/useAuth";

interface UpdateStaffFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: (updatedStaff: Staff) => Promise<void>;
  currentData?: Staff;
}

interface StaffFormData {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  cccd: string;
  address: string;
  ngayVaoLam: string;
  role: string;
  luongCoBan: string;
  avaURL: string | undefined;
}

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Nhân viên kho", value: "INVENTORY_STAFF" },
  { label: "Nhân viên bán hàng", value: "SALE_STAFF" },
];

const UpdateStaffForm: React.FC<UpdateStaffFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleUpdate,
  currentData,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    "https://via.placeholder.com/50"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<StaffFormData>({
    name: "",
    username: "",
    email: "",
    dateOfBirth: new Date().toISOString().split("T")[0],
    gender: "",
    phoneNumber: "",
    cccd: "",
    address: "",
    ngayVaoLam: new Date().toISOString().split("T")[0],
    role: "",
    luongCoBan: "",
    avaURL: "",
  });

  useEffect(() => {
    if (currentData) {
      const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      };
  console.log("current", currentData)
      setFormData({
        name: currentData.name || '',
        username: currentData.username || '',
        email: currentData.email || '',
        dateOfBirth: formatDate(currentData.dateOfBirth),
        gender: currentData.gender || '',
        phoneNumber: currentData.phoneNumber || '',
        cccd: currentData.cccd || '',
        address: currentData.address || '',
        ngayVaoLam: formatDate(currentData.ngayVaoLam),
        role: currentData.role || '',
        luongCoBan: currentData.luongCoBan?.toString() || '',
        avaURL: currentData.avaURL || undefined,
      });
      setSelectedImage(currentData.avaURL || 'https://via.placeholder.com/50');
    }
  }, [currentData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.role) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Email, Chức vụ)");
        return;
      }

      let uploadedImageUrl = selectedImage;
      if (imageFile) {
        try {
          uploadedImageUrl = await uploadImages(imageFile);
          if (!uploadedImageUrl) throw new Error("Upload ảnh thất bại");
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Upload ảnh thất bại. Vui lòng thử lại.");
          return;
        }
      }

      // Create the update payload with all fields
      const updatedStaff:any = {
        ...currentData,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth ? `${formData.dateOfBirth}T00:00:00` : null,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        cccd: formData.cccd,
        address: formData.address,
        ngayVaoLam: formData.ngayVaoLam ? `${formData.ngayVaoLam}T00:00:00` : null,
        role: formData.role,
        luongCoBan: formData.luongCoBan,
        avaURL: uploadedImageUrl
      };

      await handleUpdate(updatedStaff);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating staff:", error);
      alert(error instanceof Error ? error.message : "Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };
const handleInputChange = (field: keyof StaffFormData, value: string) => {
  let processedValue = value;
  
  // Validation logic
  switch (field) {
    case 'email':
      // Basic email validation
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        alert('Email không hợp lệ');
        return;
      }
      break;
      
    case 'phoneNumber':
      // Phone number validation - only allow numbers
      if (value && !/^\d*$/.test(value)) {
        alert('Số điện thoại chỉ được chứa số');
        return;
      }
      break;
      
    case 'cccd':
      // CCCD validation - only allow numbers
      if (value && !/^\d*$/.test(value)) {
        alert('CCCD chỉ được chứa số');
        return;
      }
      break;
      
    case 'luongCoBan':
      // Salary validation - only allow numbers
      if (value && !/^\d*$/.test(value)) {
        alert('Lương cơ bản chỉ được chứa số');
        return;
      }
      break;
  }

  setFormData((prev) => ({
    ...prev,
    [field]: processedValue,
  }));
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
          Cập nhật nhân viên
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
              {selectedImage && (
                <img 
                  src={selectedImage} 
                  alt="Staff" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Box>
            <label htmlFor="upload-photo">
            {/* <Avatar src={formData.avaURL}/> */}
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
                defaultValue={currentData?.dateOfBirth}
                onChange={(value) => handleInputChange("dateOfBirth", String(value))}
                value={formData.dateOfBirth}
                icon={<CakeIcon style={{ color: "black" }} />}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              {/* <TextBox
                datatype="date"
                title="Ngày vào làm"
                placeholder="Nhập ngày vào làm"
                defaultValue={currentData?.ngayVaoLam}
                onChange={(value) => handleInputChange("ngayVaoLam", String(value))}
                value={formData.ngayVaoLam}
                icon={<WorkIcon style={{ color: "black" }} />}
              /> */}
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
                defaultValue={currentData?.name}
                onChange={(value) => handleInputChange("name", String(value))}
                // value={formData.name}
              />
              <TextBox
                datatype="string"
                title="CCCD"
                placeholder="Nhập CCCD"
                defaultValue={currentData?.cccd}
                onChange={(value) => handleInputChange("cccd", String(value))}
                // value={formData.cccd}
                icon={<CardIcon style={{ color: "black" }} />}
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
                defaultValue={currentData?.email}
                onChange={(value) => handleInputChange("email", String(value))}
                // value={formData.email}
                icon={<EmailIcon style={{ color: "black" }} />}
              />
              <TextBox
                datatype="string"
                title="SDT"
                placeholder="Nhập SDT"
                defaultValue={currentData?.phoneNumber}
                onChange={(value) => handleInputChange("phoneNumber", String(value))}
                // value={formData.phoneNumber}
                icon={<PhoneIcon style={{ color: "black" }} />}
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
                defaultValue={currentData?.role}
                onChange={(value) => handleInputChange("role", String(value))}
                value={formData.role}
                options={roleOptions}
              />
              <TextBox
                datatype="select"
                title="Giới tính"
                placeholder="Chọn giới tính"
                defaultValue={currentData?.gender}
                onChange={(value) => handleInputChange("gender", String(value))}
                // value={formData.gender}
                options={[
                  { label: "Nam", value: "MALE" },
                  { label: "Nữ", value: "FEMALE" },
                ]}
                icon={<PersonIcon style={{ color: "black" }} />}
              />
            </Box>

            <TextBox
              datatype="string"
              title="Địa chỉ"
              placeholder="Nhập địa chỉ"
              defaultValue={currentData?.address}
              onChange={(value) => handleInputChange("address", String(value))}
              // value={formData.address}
              icon={<LocationOnIcon style={{ color: "black" }} />}
            />

            {/* <TextBox
              datatype="number"
              title="Lương cơ bản"
              placeholder="Nhập lương cơ bản"
              onChange={(value) => handleInputChange("luongCoBan", String(value))}
              value={formData.luongCoBan}
            /> */}
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
            onClick={handleSubmit}
            disabled={isSubmitting}
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