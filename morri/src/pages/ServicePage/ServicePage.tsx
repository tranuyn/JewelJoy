import React, { useState, useEffect } from "react";
import "./service.css";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import { Box } from "@mui/material";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import DynamicAddForm from "./dynamicAddForm";
import DynamicUpdateForm from "./dynamicUpdateForm";
import ServiceComponent from "../../component/ServiceComponent/ServiceComponent";
import TableComponent from "../../component/TableComponent/TableComponent";

// Types
export interface Service {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string | null;
  price: number | null;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  avaURL: string;
}

interface ServiceBooking {
  nameService: string;
  customerName: string;
  customerPhoneNumber: string;
  services: { serviceName: string }[];
  description: string;
  staffLapHoaDon: Staff | null;
  totalPrice: number;
  createdAt: string;
  deliverystatus: string;
  quantity: number;
}

// Service API layer
const serviceAPI = {
  fetchServices: async (): Promise<Service[]> => {
    const response = await fetch("http://localhost:8081/service");
    if (!response.ok) throw new Error("Failed to fetch services");
    return response.json();
  },

  deleteService: async (serviceId: string): Promise<void> => {
    const response = await fetch(`http://localhost:8081/service/${serviceId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error("Failed to delete service");
  },

  fetchBookings: async (): Promise<ServiceBooking[]> => {
    const response = await fetch("http://localhost:8081/phieuDichVu");
    if (!response.ok) throw new Error("Failed to fetch bookings");
    return response.json();
  },

  deleteBooking: async (bookingId: string): Promise<void> => {
    const response = await fetch(`http://localhost:8081/phieuDichVu/${bookingId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error("Failed to delete booking");
  }
};

const bookingColumns = [
  { field: "customerName", headerName: "Tên khách hàng" },
  { field: "customerPhoneNumber", headerName: "SDT khách hàng" },
  { field: "createdAt", headerName: "Ngày tạo" },
  { field: "deliverystatus", headerName: "Trạng thái" },
  { field: "services", headerName: "Các dịch vụ" },
  { field: "quantity", headerName: "Số lượng" },
  { field: "totalPrice", headerName: "Tổng tiền" },
  { field: "staffName", headerName: "Nhân viên lập" },
];

const ServicePage: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState<string>("Dịch vụ");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);

  const tabs = ["Dịch vụ", "Đặt lịch"];

  // Service handlers
  const handleFetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceAPI.fetchServices();
      setServices(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch services. Please try again later.");
      console.error("Service fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async () => {
    if (!selectedService) {
      alert('Vui lòng chọn dịch vụ để xóa');
      return;
    }

    try {
      await serviceAPI.deleteService(selectedService.id);
      setServices(prevServices => 
        prevServices.filter(service => service.id !== selectedService.id)
      );
      setSelectedService(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Đã xảy ra lỗi khi xóa dịch vụ');
    }
  };

  // Booking handlers
  const handleFetchBookings = async () => {
    try {
      setLoading(true);
      const data = await serviceAPI.fetchBookings();
      setBookings(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
      console.error("Booking fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteClick =async (row:any)=>{
    setSelectedBooking(row)
    if (selectedBooking) {
      
      console.log("Deleting booking:", selectedBooking);
      setIsDeleteModalOpen(true);
      await handleDeleteBooking();
    }  

  }
  const handleDeleteBooking = async () => { 

      if (!selectedBooking?.nameService) {
      alert('HEHHEHEH');
      return;
    }

    try {
      await serviceAPI.deleteBooking(selectedBooking.nameService);
      setBookings(prevBookings => 
        prevBookings.filter(booking => booking.nameService !== selectedBooking.nameService)
      );
      setSelectedBooking(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Đã xảy ra lỗi khi xóa đặt lịch');
    }
  };

  // Shared handlers
  const handleSearch = (value: string) => {
    setSearchKeyword(value.trim().toLowerCase());
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setIsModalUpdateOpen(true);
  };

  const handleUpdate = async () => {
    try {
      console.log("Updating row:", selectedRow);
      setIsModalUpdateOpen(false);
      // Refresh data after update
      if (activeTab === "Dịch vụ") {
        await handleFetchServices();
      } else {
        await handleFetchBookings();
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  // Format booking data for display
  const formatBookingData = (bookings: ServiceBooking[]) => {
    return bookings.map(booking => ({
      ...booking,
      createdAt: new Date(booking.createdAt).toLocaleDateString("vi-VN"),
      totalPrice: `${booking.totalPrice.toLocaleString("vi-VN")} VND`,
      staffName: booking.staffLapHoaDon?.name || "Chưa phân công",
      services: booking.services.map(s => s.serviceName).join(", ")
    }));
  };

  // Effects
  useEffect(() => {
    if (activeTab === "Dịch vụ") {
      handleFetchServices();
    } else {
      handleFetchBookings();
    }
  }, [activeTab]);

  return (
    <div className="service-page">
      <Header title="Quản lý dịch vụ" />
      <div style={{ padding: "10px" }}></div>

      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 3,
        marginLeft: "20px",
      }}>
        <BtnComponent
          btnColorType="primary"
          btnText={`Thêm ${activeTab.toLowerCase()}`}
          onClick={() => setIsModalOpen(true)}
        />
        <DynamicAddForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formType={activeTab}
          updateServices={(newData: any) => 
            activeTab === "Dịch vụ" 
              ? setServices(prev => [...prev, newData])
              : setBookings(prev => [...prev, newData])
          }
        />
        <Box sx={{ marginRight: "300px" }}>
          <TabBar
            tabs={tabs}
            onTabChange={setActiveTab}
            defaultTab="Dịch vụ"
            styleType="custom"
          />
        </Box>
        <SearchComponent
          placeholder={`Tìm kiếm ${activeTab.toLowerCase()}...`}
          keyword={searchKeyword}
          onSearch={handleSearch}
        />
      </Box>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div style={{ padding: "20px" }}>
          {activeTab === "Dịch vụ" ? (
            <div className="services-grid">
              {services
                .filter(service => 
                  service.serviceName.toLowerCase().includes(searchKeyword)
                )
                .map(service => (
                  <ServiceComponent
                    key={service.id}
                    serviceName={service.serviceName}
                    serviceCode={service.id}
                    description={service.serviceDescription}
                    price={service.price?.toString() || "0"}
                    imageUrl={service.serviceUrl || undefined}
                    onEdit={() => handleEdit(service)}
                    onDelete={() => {
                      setSelectedService(service);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                ))}
            </div>
          ) : (
            <TableComponent
              columns={bookingColumns}
              data={formatBookingData(
                bookings.filter(booking =>
                  booking.customerName.toLowerCase().includes(searchKeyword) ||
                  booking.customerPhoneNumber.includes(searchKeyword)
                )
              )}
              onRowClick={(row) => {handleDeleteClick(row);  console.log("rơ click: ", row)}}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      )}

      <DynamicUpdateForm
        isModalOpen={isModalUpdateOpen}
        setIsModalOpen={setIsModalUpdateOpen}
        formType={activeTab}
        handleUpdate={handleUpdate}
        currentData={selectedRow}
      />
      <DeleteComponent
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteName={activeTab}
        handleDelete={activeTab === "Dịch vụ" ? handleDeleteService : handleDeleteBooking}
      />
    </div>
  );
};

export default ServicePage;