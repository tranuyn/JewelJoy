import React, { useState } from "react";
import { Box, Modal, CircularProgress, Alert } from "@mui/material";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import TextBox from "../../component/TextBox/TextBox";
import axios from "axios";
import { useAuth } from "../../services/useAuth";

interface XinVang {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleXinVang: () => Promise<void>;
}

interface FormData {
  employeeId: string | number;
  reason: string | number;
  // date: string;
  status: "PENDING";
}

const XinVangModal: React.FC<XinVang> = ({
  isModalOpen,
  setIsModalOpen,
  handleXinVang,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    employeeId: "",
    reason: "",
    // date: new Date().toISOString(),
    status: "PENDING",
  });

  const handleChange = (field: keyof FormData) => (value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleXinVangModal = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!formData.employeeId || !formData.reason) {
        throw new Error("Please fill in all required fields");
      }
      console.log("Formdata:", formData);

      await axios.post("http://localhost:8080/absence/create", formData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM1OTEwNzA5LCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzU5NDY3MDl9.pipHtJxuHc-IE65zSBbMmN3hLMfHWCGUjg_om_lnJls`,
        },
      });

      await handleXinVang();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting absence request:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit absence request"
      );
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
            marginBottom: "20px",
          }}
        >
          Xin Vang
        </div>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextBox
          datatype="string"
          title="Mã NV"
          placeholder="Nhập mã nhân viên"
          value={formData.employeeId}
          onChange={handleChange("employeeId")}
          defaultValue={user?.id}
        />

        <TextBox
          datatype="string"
          title="Lí do vắng"
          placeholder="Nhập lí do vắng"
          value={formData.reason}
          onChange={handleChange("reason")}
        />

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <BtnComponent
            btnColorType="close"
            btnText="Đóng"
            onClick={() => setIsModalOpen(false)}
          />
          {loading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <BtnComponent
              btnColorType="primary"
              btnText="Lưu"
              onClick={handleXinVangModal}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default XinVangModal;
