import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import TextBox from "../../../component/TextBox/TextBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";

interface ThemLuongThangProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddSalary: any;
}
const ThemLuongThang: React.FC<ThemLuongThangProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleAddSalary,
}) => {
  const [loading, setLoading] = useState(false);
  const [baseSalary, setBaseSalary] = useState<number | string>(0);
  const [commissionRate, setCommissionRate] = useState<number | string>(0);
  const [salaryReceiveDate, setSalaryReceiveDate] = useState<string | number>(
    new Date().toISOString().split("T")[0]
  );
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(
        "base salary received",
        baseSalary,
        commissionRate,
        salaryReceiveDate
      );
      await handleAddSalary(baseSalary, commissionRate, salaryReceiveDate);
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
          Thêm lương tháng
        </div>

        <Box
          sx={{
            display: "flex",
            gap: 14,
            width: "100%",
            marginRight: "10px",
          }}
        >
          <TextBox
            datatype="number"
            title="Tiền lương cơ bản"
            placeholder="Nhập tiền lương cơ bản..."
            onChange={(value) => setBaseSalary(value)}
          />
          <TextBox
            datatype="number"
            title="Tiền hoa hồng"
            placeholder="Nhập tiền hoa hồng"
            onChange={(value) => setCommissionRate(value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 14,
            flexDirection: "row",
            marginRight: "10px",
            width: "100%",
          }}
        ></Box>
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
            title="Ngày nhận lương"
            placeholder=""
            onChange={(value) => setSalaryReceiveDate(value)}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
            //   defaultValue=`${New Date()}`
          />
        </Box>
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
            onClick={handleSubmit}
            disabled={loading}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ThemLuongThang;
