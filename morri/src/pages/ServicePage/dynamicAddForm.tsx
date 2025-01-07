import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { uploadImages } from "../../services/cloudinaryService";
import { Service } from "../ServicePage/ServicePage";

interface DynamicAddFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formType: string;
  updateServices: (newService: Service) => void;
}

interface ServiceFormData {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string | null;
  price: string;
}

const DynamicAddForm: React.FC<DynamicAddFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  formType,
  updateServices,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Lưu file ảnh
  const [formData, setFormData] = useState<ServiceFormData>({
    serviceName: "",
    serviceDescription: "",
    serviceUrl: null,
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Lưu file để upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (formType !== "Dịch vụ") return;

    setIsSubmitting(true);

    try {
      // Upload hình ảnh lên Cloudinary trước
      let uploadedImageUrl = null;
      if (imageFile) {
        uploadedImageUrl = await uploadImages(imageFile);
        if (!uploadedImageUrl) throw new Error("Failed to upload image");
      }

      // Gửi dữ liệu dịch vụ lên server
      const response = await fetch("http://localhost:8081/service/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName: formData.serviceName,
          serviceDescription: formData.serviceDescription,
          serviceUrl: uploadedImageUrl,
          price: parseFloat(formData.price),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      const newService = await response.json(); // Lấy dịch vụ mới từ server
     
      updateServices(newService);
      // Reset form và đóng modal
      setFormData({
        serviceName: "",
        serviceDescription: "",
        serviceUrl: null,
        price: "",
      });
      setSelectedImage(null);
      setImageFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating service:", error);
      alert("Failed to create service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ServiceFormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: String(value),
    }));
  };

  const renderFormFields = () => {
    if (formType === "Dịch vụ") {
      return (
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
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
                  gap: "8px",
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
          <Box>
            <TextBox
              datatype="string"
              title="Tên dịch vụ *"
              placeholder="Nhập tên dịch vụ"
              onChange={(value) => handleInputChange("serviceName", value)}
              value={formData.serviceName}
            />
            <TextBox
              datatype="number"
              title="Số tiền *"
              placeholder="Nhập số tiền"
              onChange={(value) => handleInputChange("price", value)}
              value={formData.price}
            />
            <TextBox
              datatype="string"
              title="Mô tả"
              placeholder="Nhập mô tả dịch vụ"
              onChange={(value) => handleInputChange("serviceDescription", value)}
              value={formData.serviceDescription}
            />
          </Box>
        </Box>
      );
    }
    return null;
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
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicAddForm;
