import React, { useState, useEffect } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import TextBox from "../../../component/TextBox/TextBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import { EmployeeDetails, Salary } from "./types";

interface UpdateSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
  handleUpdateSalary: any;
  salaryData: Salary | null;
}

const UpdateSalaryModal: React.FC<UpdateSalaryModalProps> = ({
  isOpen,
  onClose,
  userId,
  handleUpdateSalary,
  salaryData,
}) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState<string | number>(new Date().getFullYear());
  const [month, setMonth] = useState<string | number>(
    new Date().getMonth() + 1
  );
  const [receiveDate, setReceiveDate] = useState<string | number>(
    new Date().toISOString().split("T")[0]
  );
  const [baseSalary, setBaseSalary] = useState<string | number>(
    salaryData?.baseSalary || 0
  );
  const [commissionRate, setCommissionRate] = useState<string | number>(
    salaryData?.commissionRate || 0
  );
  useEffect(() => {
    if (salaryData) {
      setBaseSalary(salaryData.baseSalary);
      setCommissionRate(salaryData.commissionRate);
      setReceiveDate(salaryData.salaryReceiveDate.split("T")[0]);
    }
  }, [salaryData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formattedReceiveDate = new Date(receiveDate).toISOString();
      console.log("Formatted receiveDate for backend:", formattedReceiveDate);
      await handleUpdateSalary(
        baseSalary,
        commissionRate,
        formattedReceiveDate
      );
      // await handleUpdateSalary(baseSalary, commissionRate, receiveDate);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose()}
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
        <h2>Tính lương tháng</h2>
        <TextBox
          datatype="number"
          title="Tiền lương cơ bản"
          placeholder="Nhập tiền lương cơ bản..."
          onChange={(value) => setBaseSalary(Number(value))}
          defaultValue={baseSalary.toString()}
        />
        <TextBox
          datatype="number"
          title="Tiền hoa hồng"
          placeholder="Nhập tiền hoa hồng"
          onChange={(value) => setCommissionRate(Number(value))}
          defaultValue={commissionRate.toString()}
        />
        <TextBox
          datatype="date"
          title="Ngày nhận lương"
          placeholder=""
          onChange={(value) => setReceiveDate(value)}
          icon={<CalendarMonthIcon style={{ color: "black" }} />}
          defaultValue={salaryData?.salaryReceiveDate}
        />

        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <BtnComponent btnText="Hủy" onClick={onClose} btnColorType="close" />
          <BtnComponent
            btnText={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Tính lương"
              )
            }
            onClick={handleSubmit}
            disabled={loading}
            btnColorType="primary"
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateSalaryModal;
