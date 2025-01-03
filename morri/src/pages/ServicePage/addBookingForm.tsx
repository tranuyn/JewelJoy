import React from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";

interface AddBookingFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBookingForm: React.FC<AddBookingFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
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
          Thêm Đặt Lịch
        </div>
        <TextBox
          datatype="string"
          title="Tên khách hàng *"
          placeholder="Nhập tên khách hàng"
          onChange={(value) => {}}
          defaultValue=""
        />
        <TextBox
          datatype="string"
          title="Số điện thoại *"
          placeholder="Nhập số điện thoại"
          onChange={(value) => {}}
          defaultValue=""
        />
        <TextBox
          datatype="string"
          title="Mã dịch vụ *"
          placeholder="Nhập mã dịch vụ"
          onChange={(value) => {}}
          defaultValue=""
        />
        <TextBox
          datatype="string"
          title="Giới tính"
          placeholder="Nhập giới tính"
          onChange={(value) => {}}
          defaultValue=""
        />
        <TextBox
          datatype="date"
          title="Ngày đăng ký *"
          placeholder="Chọn ngày đăng ký"
          onChange={(value) => {}}
          defaultValue=""
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 3 }}>
          <BtnComponent
            btnColorType="close"
            btnText="Đóng"
            onClick={() => setIsModalOpen(false)}
          />
          <BtnComponent
            btnColorType="primary"
            btnText="Thêm"
            onClick={() => {}}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AddBookingForm;