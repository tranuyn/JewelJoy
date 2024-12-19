import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import TransgenderIcon from "@mui/icons-material/Transgender";
interface Customer {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: () => Promise<void>;
}
const UpdateCustomer: React.FC<Customer> = ({
  isModalOpen,
  setIsModalOpen,
  handleUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const handleUpdateModal = async () => {
    setLoading(true);
    try {
      await handleUpdate();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting:", error);
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
          Cập Nhật Nhân Viên
        </div>
        <TextBox
          datatype="string"
          title="Mã KH"
          placeholder=""
          onChange={(value) => {}}
          defaultValue=""
        />
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            gap: 10,
            width: "100%",
            marginRight: "10px",
          }}
        >
          <TextBox
            datatype="number"
            title="SDT"
            placeholder="Nhập số điện thoại..."
            onChange={(value) => {}}
            icon={<PhoneIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="select"
            title="Giới tính"
            placeholder="Chọn giới tính"
            onChange={(value) => {}}
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
            // justifyContent: "space-between",
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
            onChange={(value) => {}}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="date"
            title="Ngày ĐK thành viên"
            placeholder=""
            onChange={(value) => {}}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
            //   defaultValue=`${New Date()}`
          />
        </Box>
        <TextBox
          datatype="string"
          title="Email"
          placeholder="Nhập email"
          onChange={(value) => {}}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <BtnComponent
            btnColorType="close"
            btnText={"Đóng"}
            onClick={() => setIsModalOpen(false)}
          />
          <BtnComponent
            btnColorType="primary"
            btnText={
              loading ? <CircularProgress size={20} color="inherit" /> : "Lưu"
            }
            onClick={handleUpdate}
            disabled={loading}
          />
        </Box>
        {/* <Box sx={{ width: 400 }}>
          <CircularProgress color="primary" />
        </Box> */}
      </Box>
    </Modal>
  );
};

export default UpdateCustomer;
