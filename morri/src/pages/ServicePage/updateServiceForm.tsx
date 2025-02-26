import React from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";

interface UpdateServiceFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: () => Promise<void>;
  currentData?: {
    serviceCode: string;
    serviceName: string;
    price: string;
    description: string;
  };
}

const UpdateServiceForm: React.FC<UpdateServiceFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleUpdate,
  currentData,
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
          Cập Nhật Dịch Vụ
        </div>
        <TextBox
          datatype="string"
          title="Mã dịch vụ *"
          placeholder="Nhập mã dịch vụ"
          onChange={(value) => {}}
          defaultValue={currentData?.serviceCode || ""}
        //   disabled={true}
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
          defaultValue={currentData?.description || ""}
        />
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

export default UpdateServiceForm;