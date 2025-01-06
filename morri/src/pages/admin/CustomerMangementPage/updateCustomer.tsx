import React, { useState, useEffect } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import TextBox from "../../../component/TextBox/TextBox";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Customer } from "./CustomerManagementPage";

interface CustomerProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: (formData: FormData) => Promise<void>;
  initialData: Customer | null;
}
interface FormData {
  name: string | number;
  phoneNumber: string | number;
  gioiTinh: string | number;
  dateOfBirth: string | number;
  email: string | number;
  registrationDate?: string | number;
}

const UpdateCustomer: React.FC<CustomerProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleUpdate,
  initialData,
}) => {
  console.log("Initial data: " + JSON.stringify(initialData));
  const [name, setName] = useState<string | number>(initialData?.name || "");
  const [phoneNumber, setPhoneNumber] = useState<string | number>(
    initialData?.phoneNumber || ""
  );
  const [gioiTinh, setGioiTinh] = useState<string | number>(
    initialData?.gioiTinh || ""
  );
  const [dateOfBirth, setDateOfBirth] = useState<string | number>(
    initialData?.dateOfBirth || ""
  );
  const [email, setEmail] = useState<string | number>(initialData?.email || "");
  const [registrationDate, setRegistrationDate] = useState<string | number>(
    initialData?.ngayDangKyThanhVien || new Date().toISOString().split("T")[0]
  );
  const [isLoading, setLoading] = useState(false);

  const handleUpdateModal = async () => {
    const formData: FormData = {
      name,
      phoneNumber,
      gioiTinh,
      dateOfBirth,
      email,
      registrationDate,
    };

    setLoading(true);
    try {
      await handleUpdate(formData);
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
          padding: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: "600px",
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
          Cập nhật Khách Hàng
        </div>

        <TextBox
          datatype="string"
          title="Tên khách hàng"
          value={name}
          defaultValue={initialData?.name}
          placeholder="Nhập tên khách hàng"
          onChange={(value) => setName(value)}
        />

        <Box
          sx={{ display: "flex", gap: 10, width: "100%", marginRight: "10px" }}
        >
          <TextBox
            datatype="string"
            title="SDT"
            placeholder="Nhập số điện thoại..."
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultValue={initialData?.phoneNumber}
            icon={<PhoneIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="select"
            title="Giới tính"
            placeholder="Chọn giới tính"
            value={gioiTinh}
            onChange={setGioiTinh}
            defaultValue={initialData?.gioiTinh === "MALE" ? "Nam" : "Nữ"}
            icon={<TransgenderIcon style={{ color: "black" }} />}
            options={[
              { label: "Nam", value: "Nam" },
              { label: "Nữ", value: "Nữ" },
            ]}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 14,
            flexDirection: "row",
            marginRight: "10px",
            width: "100%",
          }}
        >
          <TextBox
            datatype="date"
            title="Ngày sinh"
            placeholder="Nhập ngày sinh"
            defaultValue={initialData?.dateOfBirth}
            value={dateOfBirth}
            onChange={setDateOfBirth}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="string"
            title="Email"
            placeholder="Nhập email"
            value={email}
            defaultValue={initialData?.email}
            onChange={setEmail}
            icon={<PhoneIcon style={{ color: "black" }} />}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <BtnComponent
            btnColorType="primary"
            btnText={isLoading ? <CircularProgress size={24} /> : "Cập nhật"}
            onClick={handleUpdateModal}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateCustomer;
