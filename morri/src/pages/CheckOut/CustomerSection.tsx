import React, { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.css";
import CachedIcon from "@mui/icons-material/Cached";
import { DataObject, DataObjectOutlined } from "@mui/icons-material";
interface CustomerSectionProps {
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo | null>>;
}
interface CustomerInfo {
  id?: string;
  phoneNumber: string;
  name: string;
  gioiTinh: string;
  dateOfBirth: string;
}
const CustomerSection: React.FC<CustomerSectionProps> = ({
  setCustomerInfo,
}) => {
  const [phone, setPhone] = useState<string>("");
  const [customerInfo, setCustomerLocalInfo] = useState<any>({});
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [selectedBirthday, setSelectedBirthday] = useState("");
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(event.target.value);
  };

  const handleReloadClick = () => {
    if (phone) {
      fetchInfo(phone);
    }
  };

  const fetchInfo = async (phone: string) => {
    try {
      const response = await fetch(
        `http://localhost:8081/customer/getCustomerByPhone/${phone}`
      );
      if (!response.ok) {
        setCustomerInfo(null);
        setCustomerLocalInfo(null);
        return;
      }
      const data = await response.json();

      // Cập nhật state local
      setCustomerLocalInfo(data);

      // Cập nhật state cha với thông tin hiện có
      setCustomerInfo({
        ...data,
        dateOfBirth: data.dateOfBirth || selectedBirthday, // Giữ ngày sinh đã chọn nếu data.dateOfBirth là null
      });

      // Cập nhật các state local
      setName(data.name);
      setSelectedGender(data.gioiTinh);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cộng thêm 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Trả về định dạng YYYY-MM-DD
  };

  useEffect(() => {
    if (customerInfo) {
      setCustomerInfo(
        (prevInfo: CustomerInfo | null) =>
          ({
            ...(prevInfo || {}),
            dateOfBirth: selectedBirthday,
          } as CustomerInfo)
      );
    }
  }, [selectedBirthday]);

  return (
    <div className="customerContainerBig">
      <div className="customerContainer">
        <PersonOutlineIcon sx={{ color: "#EFB26A", marginRight: "10px" }} />
        <div>
          <div className="BoldText">
            Thông tin khách hàng{customerInfo === null && " - Khách vãng lai"}
          </div>
          <div className="cflexrow" style={{ alignItems: "center" }}>
            <div style={{ marginRight: "100px" }}>
              <div className="catchPhone">
                <div>Số điện thoại:</div>
                <input
                  className="inputCheckout"
                  value={phone || ""}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div
                  className="CachedIconContainer"
                  onClick={() => handleReloadClick()}
                >
                  <CachedIcon sx={{ color: "#08B5FA" }} />
                </div>
              </div>
              <p>
                Giới tính:{" "}
                <select
                  className="inputCheckout"
                  id="age"
                  value={customerInfo ? customerInfo.gioiTinh : selectedGender}
                  onChange={handleChange}
                >
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                </select>
              </p>
            </div>
            <div>
              <p>
                Họ và tên:{" "}
                <input
                  value={customerInfo ? customerInfo.name : name}
                  className="inputCheckout"
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p>
                Ngày sinh:{" "}
                <input
                  type="date"
                  value={
                    customerInfo && customerInfo.dateOfBirth
                      ? formatDate(customerInfo.dateOfBirth)
                      : selectedBirthday
                  }
                  className="inputCheckout"
                  onChange={(e) => setSelectedBirthday(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSection;
