import React, { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import TextBox from "../../../component/TextBox/TextBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import { BonusPenaltyRecord } from "./types";
import Snackbar from "../../../component/Snackbar/Snackbar";

interface AddBonusPenaltyProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddBonusPenalty: (record: BonusPenaltyRecord) => Promise<void>;
  selectedUser?: any;
  type: "BONUS" | "PENALTY";
  editRecord?: BonusPenaltyRecord | null;
  salaryId: string;
}

const AddBonusPenaltyModal: React.FC<AddBonusPenaltyProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleAddBonusPenalty,
  type,
  editRecord,
  salaryId,
}) => {
  const [amount, setAmount] = useState<string | number>(
    editRecord?.amount?.toString() || ""
  );
  const [reason, setReason] = useState<string | number>(
    editRecord?.reason || ""
  );
  const [date, setDate] = useState<string | number>(
    editRecord?.date || new Date().toISOString().split("T")[0]
  );
  type SnackbarSeverity = "success" | "error" | "warning" | "info";

  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<SnackbarSeverity>("info");
  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };
  useEffect(() => {
    if (editRecord) {
      setAmount(editRecord.amount.toString());
      setReason(editRecord.reason);
      setDate(editRecord.date);
    }
  }, [editRecord]);

  const handleSubmit = async () => {
    if (!amount || !reason || !date) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      await handleAddBonusPenalty({
        id: editRecord?.id,
        type,
        amount: Number(amount),
        reason,
        date,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding bonus/penalty:", error);
      alert("Có lỗi xảy ra khi thêm thưởng/phạt");
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
          bgcolor: "white",
          borderRadius: "8px",
          p: 4,
          width: "500px",
          maxWidth: "90%",
        }}
      >
        <h2>{type === "BONUS" ? "Thêm thưởng" : "Thêm phạt"}</h2>
        <Box sx={{ mt: 2 }}>
          <TextBox
            datatype="number"
            title="Số tiền"
            placeholder="Nhập số tiền"
            onChange={(value) => setAmount(value)}
            value={amount}
            icon={<MonetizationOnIcon />}
          />
          <TextBox
            datatype="string"
            title="Lý do"
            placeholder="Nhập lý do"
            onChange={setReason}
            value={reason}
            icon={<DescriptionIcon />}
          />
          <TextBox
            datatype="date"
            title="Ngày ghi nhan"
            defaultValue={date}
            placeholder="Nhập ngày sinh"
            onChange={setDate}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
          />
        </Box>
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <BtnComponent
            btnText="Hủy"
            onClick={() => setIsModalOpen(false)}
            btnColorType="close"
          />
          <BtnComponent
            btnText={loading ? "Đang lưu..." : "Lưu"}
            onClick={handleSubmit}
            disabled={loading}
            btnColorType="primary"
          />
        </Box>
        <Snackbar
          snackbarSeverity={snackbarSeverity}
          message={snackbarMessage}
          show={snackbarVisible}
          onClose={handleCloseSnackbar}
          autoHideDuration={5000}
        />
      </Box>
    </Modal>
  );
};

export default AddBonusPenaltyModal;
