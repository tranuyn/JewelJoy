import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import TextBox from "../../../component/TextBox/TextBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
interface ThemLuongThangProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddSalary: () => Promise<void>;
}
const ThemLuongThang: React.FC<ThemLuongThangProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleAddSalary,
}) => {
  const [loading, setLoading] = useState(false);
  const handleAddSalaryModal = async () => {
    setLoading(true);
    try {
      await handleAddSalary();
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
          Thêm lương tháng
        </div>
        <TextBox
          datatype="string"
          title="Mã NV"
          placeholder=""
          onChange={(value) => {}}
          defaultValue=""
        />
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
            title="Tiền thưởng"
            placeholder="Nhập tiền thưởng..."
            onChange={(value) => {}}
          />
          <TextBox
            datatype="string"
            title="Lí do thưởng"
            placeholder="Nhập lí do thưởng"
            onChange={(value) => {}}
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
        >
          <TextBox
            datatype="number"
            title="Tiền phạt"
            placeholder="Nhập tiền phạt"
            onChange={(value) => {}}
          />
          <TextBox
            datatype="string"
            title="Lí do phạt"
            placeholder="Nhập lí do phạt"
            onChange={(value) => {}}
          />
        </Box>
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
            onChange={(value) => {}}
            icon={<CalendarMonthIcon style={{ color: "black" }} />}
            //   defaultValue=`${New Date()}`
          />
          <TextBox
            datatype="number"
            title="Tiền hoa hồng"
            placeholder="Nhập tiền hoa hồng"
            onChange={(value) => {}}
            // icon={<CalendarMonthIcon style={{ color: "black" }} />}
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
            onClick={handleAddSalaryModal}
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

export default ThemLuongThang;
