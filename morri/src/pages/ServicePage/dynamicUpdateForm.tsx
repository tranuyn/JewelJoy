import React, { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { uploadImages } from "../../services/cloudinaryService";
import { Service } from "../ServicePage/ServicePage";

interface DynamicUpdateFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formType: string;
  handleUpdate: (updatedService: Service) => Promise<void>;
  currentData?: any;
}

interface ServiceFormData {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string | null;
  price: string;
}

const formatDateToISO = (date: string): string => {
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const DynamicUpdateForm: React.FC<DynamicUpdateFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  formType,
  handleUpdate,
  currentData
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>("https://via.placeholder.com/50");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    serviceName: "",
    serviceDescription: "",
    serviceUrl: null,
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set the initial image if currentData has a serviceUrl
  //   if (currentData?.serviceUrl) {
  //     setSelectedImage(currentData.serviceUrl);
  //   }
  // }, [currentData]);
  if (currentData) {
    setFormData({
      serviceName: currentData.serviceName || "",
      serviceDescription: currentData.serviceDescription || "",
      serviceUrl: currentData.serviceUrl || null,
      price: currentData.price?.toString() || "",
    });
    setSelectedImage(currentData.serviceUrl || "https://via.placeholder.com/50");
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
    if (formType !== "Dịch vụ") return;

    setIsSubmitting(true);

    try {
      let uploadedImageUrl = selectedImage;
      if (imageFile) {
        uploadedImageUrl = await uploadImages(imageFile);
        if (!uploadedImageUrl) throw new Error("Failed to upload image");
      }
      const updates: Partial<Service> = {
        id: currentData.id, // Keep the original ID
        serviceName: formData.serviceName,
        serviceDescription: formData.serviceDescription,
        serviceUrl: uploadedImageUrl,
        price: parseFloat(formData.price)
      };

      
      // Only include changed fields
      if (formData.serviceName !== currentData.serviceName) {
        updates.serviceName = formData.serviceName;
      }
      if (formData.serviceDescription !== currentData.serviceDescription) {
        updates.serviceDescription = formData.serviceDescription;
      }
      if (uploadedImageUrl !== currentData.serviceUrl) {
        updates.serviceUrl = uploadedImageUrl;
      }
      if (formData.price !== currentData.price?.toString()) {
        updates.price = parseFloat(formData.price);
      }

      // const response = await fetch("http://localhost:8081/service/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     serviceName: formData.serviceName,
      //     serviceDescription: formData.serviceDescription,
      //     serviceUrl: uploadedImageUrl,
      //     price: parseFloat(formData.price),
      //   }),
      // });
      const response = await fetch(`http://localhost:8081/service/${currentData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      const updatedService = await response.json();
      
      // Call the handleUpdate prop with the updated service
      await handleUpdate(updatedService);
      
      setIsModalOpen(false);
      
      // Reset form and close modal
      // setFormData({
      //   serviceName: "",
      //   serviceDescription: "",
      //   serviceUrl: null,
      //   price: "",
      // });
      // setSelectedImage("https://via.placeholder.com/50");
      // setImageFile(null);
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
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
              defaultValue={currentData?.serviceName || ""}
            />
            <TextBox
              datatype="number"
              title="Số tiền *"
              placeholder="Nhập số tiền"
              onChange={(value) => handleInputChange("price", value)}
              defaultValue={currentData?.price || ""}
            />
            <TextBox
              datatype="string"
              title="Mô tả"
              placeholder="Nhập mô tả dịch vụ"
              onChange={(value) => handleInputChange("serviceDescription", value)}
              defaultValue={currentData?.serviceDescription || ""}
            />
          </Box>
        </Box>
      );
    } else if (formType === "Đặt lịch") {
      return (
        <>
          <TextBox
            datatype="string"
            title="Tên khách hàng *"
            placeholder="Nhập tên khách hàng"
            onChange={(value) => {}}
            defaultValue={currentData?.customerName || ""}
          />
          <TextBox
            datatype="string"
            title="Số điện thoại *"
            placeholder="Nhập số điện thoại"
            onChange={(value) => {}}
            defaultValue={currentData?.phoneNumber || ""}
          />
          <TextBox
            datatype="string"
            title="Mã dịch vụ *"
            placeholder="Nhập mã dịch vụ"
            onChange={(value) => {}}
            defaultValue={currentData?.serviceCode || ""}
          />
          <TextBox
            datatype="string"
            title="Giới tính"
            placeholder="Nhập giới tính"
            onChange={(value) => {}}
            defaultValue={currentData?.gender || ""}
          />
          <TextBox
            datatype="date"
            title="Ngày đăng ký *"
            placeholder="Chọn ngày đăng ký"
            onChange={(value) => {}}
            defaultValue={currentData?.registrationDate ? formatDateToISO(currentData.registrationDate) : ""}
          />
          <TextBox
            datatype="string"
            title="Tình trạng dịch vụ *"
            placeholder="Nhập tình trạng dịch vụ"
            onChange={(value) => {}}
            defaultValue={currentData?.serviceStatus || ""}
          />
        </>
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
          Cập nhật {formType}
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
            btnText="Cập nhật"
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicUpdateForm;