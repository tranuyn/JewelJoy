import React, { useState, useEffect } from "react";
import { Box, Modal, FormControl, Select, MenuItem, OutlinedInput, Chip } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { uploadImages } from "../../services/cloudinaryService"; 
import { useAuth } from "../../services/useAuth";

interface Service {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string | null;
  price: number | null;
}

const serviceAPI = {
  fetchServices: async (): Promise<Service[]> => {
    const response = await fetch("http://localhost:8081/service");
    if (!response.ok) throw new Error("Failed to fetch services");
    return response.json();
  },

  createService: async (serviceData: Partial<Service>): Promise<Service> => {
    console.log("serviceData: "+ JSON.stringify(serviceData));
    const response = await fetch("http://localhost:8081/service/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceData),
    });
    console.log("response: "+ JSON.stringify(response));

    if (!response.ok) throw new Error("Failed to create service");
    return response.json();
  },

  createBooking: async (bookingData: any): Promise<any> => {
    const response = await fetch("http://localhost:8081/phieuDichVu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error("Failed to create booking");
    return response.json();
  }
};

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

interface BookingFormData {
  customerName: string;
  customerPhone: string;
  customerGender: string;
  deliveryDate: string;
  services: string[];
  nameService: string;
  description: string;
  phieuServiceStatus: string;
  totalPrice: number;
  quantity: number;
  staffLapHoaDon: string | undefined;
  staffLamDichVu: string | undefined;
}

export interface ServiceWithPrice {
  id: string;
  serviceName: string;
  price: number;
}

const DynamicAddForm: React.FC<DynamicAddFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  formType,
  updateServices,
  // currentUser
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {user}= useAuth();

  const [formServiceData, setFormServiceData] = useState<ServiceFormData>({
    serviceName: "",
    serviceDescription: "",
    serviceUrl: null,
    price: "",
  });

  const [formBookingData, setFormBookingData] = useState<BookingFormData>({
    customerName: "",
    customerPhone: "",
    customerGender: " ", // Default value
    deliveryDate: new Date().toISOString(),
    services: [],
    nameService: `#${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    description: "",
    phieuServiceStatus: "NOT_YET",
    totalPrice: 0,
    quantity: 1,
    staffLapHoaDon: user?.id,
    staffLamDichVu: user?.id, // Using the same staff ID for both fields
  });
  const [selectedServices, setSelectedServices] = useState<ServiceWithPrice[]>([]);
  // Fetch services only when needed
  const fetchServices = async () => {
    try {
      setError(null);
      const services = await serviceAPI.fetchServices();
      setAvailableServices(services);
    } catch (error) {
      setError("Failed to fetch services. Please try again.");
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen && formType === "Đặt lịch") {
      fetchServices();
    }
  }, [isModalOpen, formType]);

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

  const handleServiceInputChange = (field: keyof ServiceFormData, value: string | number) => {
    setFormServiceData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingInputChange = (field: keyof BookingFormData, value: string | number | string[]) => {
    setFormBookingData(prev => ({ ...prev, [field]: value }));
  };

  const resetForms = () => {
    setFormServiceData({
      serviceName: "",
      serviceDescription: "",
      serviceUrl: null,
      price: "",
    });
    setFormBookingData({
      customerName: "",
      customerPhone: "",
      customerGender: "Female",
      deliveryDate: new Date().toISOString(),
      services: [],
      nameService: `#${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      description: "",
      phieuServiceStatus: "NOT_YET",
      totalPrice: 0,
      quantity: 1,
      staffLapHoaDon: user?.id,
      staffLamDichVu: user?.id,
    });
    setSelectedImage(null);
    setImageFile(null);
    setError(null);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (formType === "Dịch vụ") {
        let uploadedImageUrl = null;
        if (imageFile) {
          uploadedImageUrl = await uploadImages(imageFile);
          if (!uploadedImageUrl) throw new Error("Failed to upload image");
        }

        const newService = await serviceAPI.createService({
          serviceName: formServiceData.serviceName,
          serviceDescription: formServiceData.serviceDescription,
          serviceUrl: uploadedImageUrl,
          price: parseFloat(formServiceData.price),
        });

        updateServices(newService);
      } else {
        const deliveryDate = new Date(formBookingData.deliveryDate);
      const formattedDeliveryDate = deliveryDate.toISOString();

      const bookingData = {
        nameService: formBookingData.nameService,
        services: formBookingData.services.map(serviceId => serviceId), // Just pass the service IDs directly
        description: formBookingData.description,
        staffLapHoaDon: formBookingData.staffLapHoaDon, // Pass the ID directly
        customerName: formBookingData.customerName,
        customerPhone: formBookingData.customerPhone,
        customerGender: formBookingData.customerGender,
        staffLamDichVu: formBookingData.staffLamDichVu, // Pass the ID directly
        quantity: formBookingData.quantity,
        totalPrice: formBookingData.totalPrice,
        deliveryDate: formattedDeliveryDate,
        phieuServiceStatus: "NOT_YET" // Match the status field from the JSON
      };
        
        console.log("Sending booking data:", JSON.stringify(bookingData));
        const newBooking = await serviceAPI.createBooking(bookingData);
        
        // Make sure the parent component updates the table
        if (typeof updateServices === 'function') {
          updateServices(newBooking);
        }
      }

      resetForms();
      setIsModalOpen(false);
    } catch (error) {
      setError(`Failed to create ${formType.toLowerCase()}. Please try again.`);
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same...
  const renderServiceForm = () => (
    <Box sx={{
      flex: 1,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0 20px",
    }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: "#f0f0f0",
          marginBottom: "16px",
          overflow: "hidden",
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
          onChange={(value) => handleServiceInputChange("serviceName", String(value))}
          value={formServiceData.serviceName}
        />
        <TextBox
          datatype="number"
          title="Số tiền *"
          placeholder="Nhập số tiền"
          onChange={(value) => handleServiceInputChange("price", String(value))}
          value={formServiceData.price}
        />
        <TextBox
          datatype="string"
          title="Mô tả"
          placeholder="Nhập mô tả dịch vụ"
          onChange={(value) => handleServiceInputChange("serviceDescription", String(value))}
          value={formServiceData.serviceDescription}
        />
      </Box>
    </Box>
  );

  useEffect(() => {
    // Calculate total price whenever selected services or quantity changes
    const total = selectedServices.reduce((sum, service) => sum + (service.price || 0), 0);
    setFormBookingData(prev => ({ ...prev, totalPrice: total }));
  }, [selectedServices]);
  

  const handleServiceSelect = (event: any) => {
    const selectedServiceIds = event.target.value;
    const selectedServiceObjects = availableServices
      .filter(service => selectedServiceIds.includes(service.id))
      .map(service => ({
        id: service.id,
        serviceName: service.serviceName,
        price: service.price || 0
      }));
    
    setSelectedServices(selectedServiceObjects);
    setFormBookingData(prev => ({
      ...prev,
      services: selectedServiceIds, // Store the service IDs directly
      quantity: selectedServiceIds.length
    }));
  };

  const renderBookingForm = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextBox
        datatype="string"
        title="Tên khách hàng *"
        placeholder="Nhập tên khách hàng"
        onChange={(value) => handleBookingInputChange("customerName", value)}
        value={formBookingData.customerName}
      />
      <TextBox
        datatype="string"
        title="Số điện thoại *"
        placeholder="Nhập số điện thoại"
        onChange={(value) => handleBookingInputChange("customerPhone", value)}
        value={formBookingData.customerPhone}
      />
      <FormControl fullWidth>
        <div style={{ marginBottom: "8px", color: "#264850" }}>Giới tính</div>
        <Select
          value={formBookingData.customerGender}
          onChange={(e) => handleBookingInputChange("customerGender", e.target.value)}
        >
          <MenuItem value="Female">Nữ</MenuItem>
          <MenuItem value="Male">Nam</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <div style={{ marginBottom: "8px", color: "#264850" }}>Chọn dịch vụ *</div>
        <Select
          multiple
          value={formBookingData.services}
          onChange={handleServiceSelect}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const service = availableServices.find(s => s.id === value);
                return <Chip key={value} label={service?.serviceName || value} />;
              })}
            </Box>
          )}
        >
          {availableServices.map((service) => (
            <MenuItem key={service.id} value={service.id}>
              {service.serviceName} - {service.price?.toLocaleString('vi-VN')} VND
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 2, bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        <div>Số lượng dịch vụ đã chọn: {formBookingData.quantity}</div>
        <div style={{ fontWeight: 'bold', marginTop: '8px' }}>
          Tổng tiền: {formBookingData.totalPrice.toLocaleString('vi-VN')} VND
        </div>
      </Box>
    </Box>
  );
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
      <Box sx={{
        backgroundColor: "white",
        padding: 4,
        borderRadius: 2,
        width: "90%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        <div style={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "#264850",
          textAlign: "center",
          marginBottom: "20px",
        }}>
          Thêm {formType}
        </div>
        {error && (
          <Box sx={{ color: 'error.main', mb: 2, textAlign: 'center' }}>
            {error}
          </Box>
        )}
        {formType === "Dịch vụ" ? renderServiceForm() : renderBookingForm()}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 3 }}>
          <BtnComponent
            btnColorType="close"
            btnText="Đóng"
            onClick={() => {
              resetForms();
              setIsModalOpen(false);
            }}
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