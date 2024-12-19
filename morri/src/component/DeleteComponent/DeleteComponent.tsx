import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import BtnComponent from "../../component/BtnComponent/BtnComponent";

interface DeleteComponentProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteName: string;
  handleDelete: () => Promise<void>;
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({
  isModalOpen,
  setIsModalOpen,
  deleteName,
  handleDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await handleDelete();
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
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <div
          style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "16px" }}
        >
          Bạn có chắc chắn muốn xoá{" "}
          <span style={{ color: "#d32f2f" }}>{deleteName}</span> không?
        </div>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <BtnComponent
            btnColorType="close"
            btnText="Huỷ"
            onClick={() => setIsModalOpen(false)}
          />
          <BtnComponent
            btnColorType="primary"
            btnText={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Xác nhận"
              )
            }
            onClick={handleConfirmDelete}
            disabled={loading}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteComponent;
