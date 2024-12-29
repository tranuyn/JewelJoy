import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import TextBox from "../../component/TextBox/TextBox";
interface XinVang {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleXinVang: () => Promise<void>;
}
const XinVangModal: React.FC<XinVang> = ({
  isModalOpen,
  setIsModalOpen,
  handleXinVang,
}) => {
  const [loading, setLoading] = useState(false);
  const handleXinVangModal = async () => {
    setLoading(true);
    try {
      await handleXinVang();
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
          Xin Vang
        </div>
        <TextBox
          datatype="string"
          title="Mã NV"
          placeholder=""
          onChange={(value) => {}}
          defaultValue=""
        />
        <TextBox
          datatype="string"
          title="Li do vang"
          placeholder="Nhập li do vang"
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
            onClick={handleXinVangModal}
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

export default XinVangModal;
