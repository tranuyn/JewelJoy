import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NoteIcon from "@mui/icons-material/Note";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { TableRow } from "./TongHop";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: UpdateAttendanceRecord | UpdateAbsence) => void;
  row: TableRow;
}

interface UpdateAttendanceRecord {
  checkIn?: string;
  checkOut?: string;
  notes?: string;
}

interface UpdateAbsence {
  reason?: string;
  status?: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  row,
}) => {
  const isAbsence = row.status === "ABSENT";
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<
    UpdateAttendanceRecord | UpdateAbsence
  >(() => {
    return isAbsence
      ? {
          reason: row.reason || "",
          status: row.status || "",
        }
      : {
          notes: row.reason || "",
          checkIn: row.checkInTime !== "-" ? row.checkInTime : "",
          checkOut: row.checkOutTime !== "-" ? row.checkOutTime : "",
        };
  });

  const handleUpdateModal = async () => {
    setIsLoading(true);
    try {
      await onUpdate(formData);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
          {isAbsence ? "Cập nhật Nghỉ phép" : "Cập nhật Chấm công"}
        </div>

        {!isAbsence ? (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 10,
                width: "100%",
                marginRight: "10px",
              }}
            ></Box>
            <TextBox
              datatype="string"
              title="Ghi chú"
              value={(formData as UpdateAttendanceRecord).notes || ""}
              placeholder="Nhập ghi chú"
              onChange={(value) =>
                setFormData({
                  ...(formData as UpdateAttendanceRecord),
                  notes: value as string,
                })
              }
              defaultValue={row.reason}
              icon={<NoteIcon style={{ color: "black" }} />}
            />
          </>
        ) : (
          <>
            <TextBox
              datatype="string"
              title="Lý do nghỉ"
              value={(formData as UpdateAbsence).reason || ""}
              placeholder="Nhập lý do nghỉ"
              onChange={(value) =>
                setFormData({
                  ...(formData as UpdateAbsence),
                  reason: value as string,
                })
              }
              defaultValue={row.reason}
              icon={<NoteIcon style={{ color: "black" }} />}
            />
            <TextBox
              datatype="select"
              title="Trạng thái"
              value={(formData as UpdateAbsence).status || ""}
              placeholder="Chọn trạng thái"
              onChange={(value) =>
                setFormData({
                  ...(formData as UpdateAbsence),
                  status: value as string,
                })
              }
              defaultValue={row.status}
              icon={<EventAvailableIcon style={{ color: "black" }} />}
              options={[
                { label: "Chờ duyệt", value: "PENDING" },
                { label: "Đã duyệt", value: "APPROVED" },
                { label: "Từ chối", value: "REJECTED" },
              ]}
            />
          </>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            gap: 2,
          }}
        >
          <BtnComponent btnColorType="close" btnText="Hủy" onClick={onClose} />
          <BtnComponent
            btnColorType="primary"
            btnText={isLoading ? <CircularProgress size={24} /> : "Cập nhật"}
            onClick={handleUpdateModal}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
