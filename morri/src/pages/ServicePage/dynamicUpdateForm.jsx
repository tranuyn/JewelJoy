import React from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";

interface DynamicUpdateFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formType: string;
  handleUpdate: () => Promise<void>;
  currentData?: any; // You can replace 'any' with a more specific type based on your data structure
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
  const renderFormFields = () => {
    if (formType === "Dịch vụ") {
      return (
        <>
          <TextBox
            datatype="string"
            title="Mã dịch vụ *"
            placeholder="Nhập mã dịch vụ"
            onChange={(value) => {}}
            defaultValue={currentData?.id || ""}
            disabled={true} // Usually service code shouldn't be editable
          />
          <TextBox
            datatype="string"
            title="Tên dịch vụ *"
            placeholder="Nhập tên dịch vụ"
            onChange={(value) => {}}
            defaultValue={currentData?.serviceName || ""}
          />
          <TextBox
            datatype="number"
            title="Số tiền *"
            placeholder="Nhập số tiền"
            onChange={(value) => {}}
            defaultValue={currentData?.price || ""}
          />
          <TextBox
            datatype="string"
            title="Mô tả"
            placeholder="Nhập mô tả dịch vụ"
            onChange={(value) => {}}
            defaultValue={currentData?.serviceDescription || ""}
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
            onClick={handleUpdate}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicUpdateForm;