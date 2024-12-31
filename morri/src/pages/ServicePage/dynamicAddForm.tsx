import React from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";

interface DynamicAddFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formType: string; 
}

const DynamicAddForm: React.FC<DynamicAddFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  formType,
}) => {
  const renderFormFields = () => {
    if (formType === "Dịch vụ") {
      return (
        <>
          <TextBox
            datatype="string"
            title="Mã dịch vụ *"
            placeholder="Nhập mã dịch vụ"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="string"
            title="Tên dịch vụ *"
            placeholder="Nhập tên dịch vụ"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="number"
            title="Số tiền *"
            placeholder="Nhập số tiền"
            onChange={(value) => {}}
            defaultValue=""
          />
          <TextBox
            datatype="string"
            title="Mô tả"
            placeholder="Nhập mô tả dịch vụ"
            onChange={(value) => {}}
            defaultValue=""
          />
        </>
      );
    } else if (formType === "Đặt lịch") {
      return (
        <>
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
        </>
      );
    }
    return null; // Return null for any other tab value
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
            onClick={() => {}}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicAddForm;