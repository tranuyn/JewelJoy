import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import TextBox from "../../../component/TextBox/TextBox";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface Customer {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAdd: (formData: FormData) => Promise<void>;
}

interface FormData {
  name: string | number;
  phoneNumber: string | number;
  gioiTinh: string | number;
  dateOfBirth: string | number;
  email: string | number;
  registrationDate?: string | number;
}

const AddCustomer: React.FC<Customer> = ({
  isModalOpen,
  setIsModalOpen,
  handleAdd,
}) => {
  const [name, setName] = useState<string | number>("");
  // const [value, setValue] = useState<string | number>("");

  const [phoneNumber, setPhoneNumber] = useState<string | number>("");
  const [gioiTinh, setGioiTinh] = useState<string | number>("");
  const [dateOfBirth, setDateOfBirth] = useState<string | number>("");
  const [email, setEmail] = useState<string | number>("");
  const [registrationDate, setRegistrationDate] = useState<string | number>(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setLoading] = useState(false);

  const handleAddModal = async () => {
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
      await handleAdd(formData);
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
          Thêm Khách Hàng
        </div>

        <TextBox
          datatype="string"
          title="Tên khách hàng"
          value={name}
          placeholder="Nhập tên khách hàng"
          onChange={(value) => setName(value)}
          defaultValue=""
        />

        <Box
          sx={{ display: "flex", gap: 10, width: "100%", marginRight: "10px" }}
        >
          <TextBox
            datatype="string"
            title="SDT"
            placeholder="Nhập số điện thoại..."
            onChange={setPhoneNumber}
            icon={<PhoneIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="select"
            title="Giới tính"
            placeholder="Chọn giới tính"
            onChange={setGioiTinh}
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
            onChange={setDateOfBirth}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="date"
            title="Ngày ĐK thành viên"
            placeholder=""
            // onChange={setRegistrationDate}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
            defaultValue={registrationDate}
          />
        </Box>

        <TextBox
          datatype="string"
          title="Email"
          placeholder="Nhập email"
          onChange={setEmail}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <BtnComponent
            btnColorType="close"
            btnText="Đóng"
            onClick={() => setIsModalOpen(false)}
          />
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <BtnComponent
              btnColorType="primary"
              btnText="Thêm"
              onClick={handleAddModal}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCustomer;
