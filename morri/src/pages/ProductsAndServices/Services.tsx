import React, { useState, useEffect } from "react";
import "../ServicePage/service.css";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import { Box } from "@mui/material";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import ServiceComponent from "../../component/ServiceComponent/ServiceComponent";

// Types
interface Service {
  id: string;
  serviceCode: string;
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string | undefined;
  price: number | null;
}

const Services: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8081/service");
      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 3,
          marginLeft: "20px",
        }}
      >
        <SearchComponent
          placeholder={`Tìm kiếm`}
          keyword={searchKeyword}
          onSearch={handleSearch}
        />
      </Box>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div style={{ padding: "20px" }}>
          <div className="serviceGrid3">
            {services
              .filter((service) =>
                service.serviceName
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase())
              )
              .map((service) => (
                <div className="productItem">
                  <div className="service-row">
                    {" "}
                    {/* Bao phủ hình ảnh và nội dung */}
                    <div className="service-image-container">
                      <img
                        src={service.serviceUrl}
                        alt={service.serviceName}
                        className="service-image"
                      />
                    </div>
                    <div className="service-column">
                      {" "}
                      {/* Bao phủ nội dung, hiển thị dọc */}
                      <h3 className="service-name">{service.serviceName}</h3>
                      <div className="service-code">
                        Mã dịch vụ: {service.serviceCode}
                      </div>
                      <div className="service-description">
                        {service.serviceDescription}
                      </div>
                      <div className="service-price">
                        Đơn giá: {Number(service.price).toLocaleString("vi-VN")}{" "}
                        VND
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
