import React, { useState, useEffect } from "react";
import "./salaryPage.css";
import { Box } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TableComponent from "../../../component/TableComponent/TableComponent";
import TextBox from "../../../component/TextBox/TextBox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import Header from "../../../component/Title_header/Header";
import ThemLuongThang from "./ThemLuongThang";
import BonusPenaltySection from "./BonusPenaltySection";
import { EmployeeDetails, Salary } from "./types";
import Snackbar from "../../../component/Snackbar/Snackbar";
import DeleteComponent from "../../../component/DeleteComponent/DeleteComponent";
import UpdateSalaryModal from "./UpdateSalaryModal";

interface BonusPenaltyRecord {
  id?: string;
  type: "BONUS" | "PENALTY";
  amount: number;
  reason: string | number;
  date: string | number;
}
interface AttendanceRecord {
  id: string;
  date: string | null;
  checkIn: string | null;
  checkOut: string | null;
  status: string | null;
  workingHours: number | null;
  notes: string;
  checkType: "IN" | "OUT";
  employee: EmployeeDetails;
}

interface AbsenceRecord {
  id: string;
  date: string;
  employee: EmployeeDetails;
  reason: string;
  status: string;
}

interface AttendanceData {
  id: string;
  employeeId: EmployeeDetails;
  year: number;
  month: number;
  attendanceRecords: AttendanceRecord[];
  workingDays: number;
  absences: AbsenceRecord[];
  totalWorkingHours: number;
  totalAbsences: number;
  totalLateArrivals: number;
}

const columns = [
  { field: "staffName", headerName: "Tên nhân viên" },
  { field: "totalSalary", headerName: "Tổng lương" },
  { field: "totalBonusAndPenalty", headerName: "Tiền thưởng phạt" },
  // { field: "totalPhat", headerName: "Tiền phạt" },
  { field: "salaryDate", headerName: "Ngày nhận lương" },
  { field: "totalFlower", headerName: "Tiền lương tính theo hoa hồng" },
  { field: "productsCompleted", headerName: "Số sản phẩm" },
];
type SnackbarSeverity = "success" | "error" | "warning" | "info";

const SalaryPage: React.FC = () => {
  const [users, setUsers] = useState<EmployeeDetails[]>([]);
  const [isModalThemLuongOpen, setModalThemLuongOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSalary, setCurrentSalary] = useState<Salary | null>(null);
  const [isSalaryModalOpen, setSalaryModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<SnackbarSeverity>("info");
  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<EmployeeDetails | null>(
    null
  );
  const fetchAttendanceData = async (employeeId: string) => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const response = await fetch(
        `http://localhost:8081/attendance/employee/${employeeId}/${year}/${month}`
      );
      const data: AttendanceData = await response.json();
      setAttendanceData(data);
      return data;
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      return null;
    }
  };
  const getTableData = () => {
    if (!currentSalary || !currentSalary.employeeId) return [];
    console.log("currentSalary: " + JSON.stringify(currentSalary));
    const totalPenalties =
      currentSalary.bonusRecords
        ?.filter((record) => record.type === "PENALTY")
        .reduce((sum, record) => sum + record.amount, 0) || 0;

    return [
      {
        id: currentSalary.id,
        staffName: currentSalary.employeeId.name,
        totalSalary: formatPrice(currentSalary.totalSalary),
        totalBonusAndPenalty: formatPrice(currentSalary.totalBonusAndPenalty),
        salaryDate: formatDate(currentSalary.salaryReceiveDate),
        totalFlower: formatPrice(currentSalary.salaryCommissionBased),
        productsCompleted: currentSalary.productsCompleted,
      },
    ];
  };
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const fetchCurrentSalary = async (employeeId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8081/salary/employee/${employeeId}`
      );
      const salaries: Salary[] = await response.json();
      if (salaries.length > 0) {
        const latestSalary = salaries[salaries.length - 1];
        // Ensure we have complete employee details
        if (latestSalary && latestSalary.employeeId) {
          setCurrentSalary(latestSalary);
          return latestSalary;
        }
      }
      setCurrentSalary(null);
      return null;
    } catch (error) {
      console.error("Error fetching salary:", error);
      setCurrentSalary(null);
      return null;
    }
  };
  // console.log("currentSalary", currentSalary);
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8081/user/");
      const data: EmployeeDetails[] = await response.json();
      const filteredUsers = data.filter((user) => user.role !== "ADMIN");
      setUsers(filteredUsers);
      // setUsers(data);

      if (filteredUsers.length > 0) {
        setSelectedUser(filteredUsers[0]);
        await fetchCurrentSalary(filteredUsers[0].id);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = async (user: EmployeeDetails) => {
    console.log("user", user);
    setSelectedUser(user);

    await Promise.all([
      fetchCurrentSalary(user.id),
      fetchAttendanceData(user.id),
    ]);
  };
  useEffect(() => {
    if (selectedUser?.id) {
      fetchCurrentSalary(selectedUser.id);
      fetchAttendanceData(selectedUser.id);
    }
  }, [selectedUser]);

  const handleAddSalary = async (
    baseSalary: string | number,
    commissionRate: string | number,
    salaryReceiveDate: string | number
  ) => {
    if (!selectedUser?.id) {
      setSnackbarMessage("No user selected");
      setSnackbarSeverity("error");
      setSnackbarVisible(true);
      return;
    }

    console.log("baseSalary: ", baseSalary);
    console.log("commissionRate: ", commissionRate);
    console.log("salaryReceiveDate: ", salaryReceiveDate);

    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      console.log(
        "Route: ",
        `http://localhost:8081/salary/calculate/${selectedUser.id}?year=${year}&month=${month}`
      );
      const response = await fetch(
        `http://localhost:8081/salary/calculate/${selectedUser.id}?year=${year}&month=${month}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            baseSalary,
            commissionRate,
            salaryReceiveDate: `${salaryReceiveDate}T23:59:59`,
          }),
        }
      );
      console.log("respoonse add : " + JSON.stringify(response));

      if (!response.ok) {
        throw new Error("Failed to add salary");
      }

      const newSalary = await response.json();
      console.log("respoonse add 2: " + JSON.stringify(newSalary));

      setCurrentSalary(newSalary);
      setSnackbarMessage("Salary added successfully");
      setSnackbarSeverity("success");
      setSnackbarVisible(true);
      setModalThemLuongOpen(false);
    } catch (error) {
      console.error("Error adding salary:", error);
      setSnackbarMessage("Failed to add salary");
      setSnackbarSeverity("error");
      setSnackbarVisible(true);
    }
  };

  const handleUpdateSalary = async (
    baseSalary: string | number,
    commissionRate: string | number,
    salaryReceiveDate: string | number
  ) => {
    if (!currentSalary?.id) {
      setSnackbarMessage("No salary record to update");
      setSnackbarSeverity("error");
      setSnackbarVisible(true);
      return;
    }

    try {
      console.log("baseSalary: " + baseSalary);
      console.log("commissionRate: " + commissionRate);
      console.log("salaryReceiveDate: " + salaryReceiveDate);
      const response = await fetch(
        `http://localhost:8081/salary/${currentSalary.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            baseSalary,
            commissionRate,
            salaryReceiveDate: `${salaryReceiveDate}T23:59:59`,
          }),
        }
      );
      console.log("respoonse update : " + JSON.stringify(response));

      if (!response.ok) {
        throw new Error("Failed to update salary");
      }

      const updatedSalary = await response.json();
      console.log("respoonse updatedSalary : " + JSON.stringify(updatedSalary));

      setCurrentSalary(updatedSalary);
      setSnackbarMessage("Salary updated successfully");
      setSnackbarSeverity("success");
      setSnackbarVisible(true);
      setSalaryModalOpen(false);
    } catch (error) {
      console.error("Error updating salary:", error);
      setSnackbarMessage("Failed to update salary");
      setSnackbarSeverity("error");
      setSnackbarVisible(true);
    }
  };
  const handleAddBonusPenalty = async (
    salaryId: string | null,
    record: BonusPenaltyRecord
  ) => {
    try {
      if (record.date) {
        const originalDate = new Date(record.date);
        const year = originalDate.getFullYear();
        const month = originalDate.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();
        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${lastDay}T23:59:59`;

        record.date = formattedDate;
      }
      console.log("record:" + JSON.stringify(record));
      console.log("salaryId: " + salaryId);

      const response = await fetch(
        `http://localhost:8081/salary/${salaryId}/bonus-penalty`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        }
      );
      console.log(
        "response from handleAddBonusPenalty :" + JSON.stringify(response)
      );
      const updatedSalary = await response.json();
      if (selectedUser?.id) {
        await fetchCurrentSalary(selectedUser.id);
      }
      setSnackbarMessage("Successfully added bonus/penalty");
      setSnackbarSeverity("success");
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error adding bonus/penalty:", error);
      setSnackbarMessage("Error adding bonus/penalty");
      setSnackbarSeverity("error");
      setSnackbarVisible(true);
      throw error;
    }
  };

  const handleEditBonusPenalty = async (
    salaryId: string | null,
    recordId: string,
    record: BonusPenaltyRecord
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8081/salary/${salaryId}/bonus-penalty/${recordId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        }
      );
      const updatedSalary = await response.json();
      if (selectedUser?.id) {
        await fetchCurrentSalary(selectedUser.id);
      }
      setSnackbarMessage("Successfully updated bonus/penalty");
      setSnackbarSeverity("success");
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error editing bonus/penalty:", error);
      setSnackbarMessage("Error updating bonus/penalty");
      setSnackbarSeverity("error");
      setSnackbarVisible(true);
      throw error;
    }
  };

  const handleDeleteBonusPenalty = async (
    salaryId: string,
    recordId: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8081/salary/${salaryId}/bonus-penalty/${recordId}`,
        {
          method: "DELETE",
        }
      );
      const updatedSalary = await response.json();

      setCurrentSalary(updatedSalary);
    } catch (error) {
      console.error("Error deleting bonus/penalty:", error);
      throw error;
    }
  };
  const handleDeleteSalary = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/salary/${currentSalary?.id}`,
        {
          method: "DELETE",
        }
      );
      // const deletedSalary = await response.json();
      console.log("deletedSalary", response);
      setCurrentSalary(null);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting salary:", error);
      throw error;
    }
  };

  return (
    <div>
      <Header title="Quản lý lương" />
      <div style={{ padding: "10px" }}></div>
      <div className="salary-container">
        <div className="left-column">
          <ul className="staff-list">
            {users.map((user) => (
              <li
                key={user.id}
                className="staff-item"
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={user.avaURL || "https://via.placeholder.com/50"}
                  alt="Staff"
                  className="staff-img"
                />
                <div className="staff-info">
                  <p className="staff-name">{user.name}</p>
                  <p className="staff-role">{user.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="right-side">
          <div className="top-row">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "30px",
                marginBottom: "20px",
              }}
            >
              <h3>Thống kê theo tháng</h3>
              <BtnComponent
                btnColorType="primary"
                btnText="Thêm Lương Tháng"
                onClick={() => setModalThemLuongOpen(true)}
              />
            </div>

            <div className="bottom-row">
              <BonusPenaltySection
                selectedUser={selectedUser}
                currentSalary={currentSalary}
                onAddRecord={handleAddBonusPenalty}
                onEditRecord={handleEditBonusPenalty}
                onDeleteRecord={handleDeleteBonusPenalty}
              />
            </div>
            <h3>Lương theo tháng</h3>
            {selectedUser && (
              <TableComponent
                columns={columns}
                data={getTableData()}
                onRowClick={(row) => console.log("Row clicked:", row)}
                onEdit={(row) => setSalaryModalOpen(true)}
                onDelete={(row) => setIsDeleteModalOpen(true)}
              />
            )}
            <ThemLuongThang
              isModalOpen={isModalThemLuongOpen}
              setIsModalOpen={setModalThemLuongOpen}
              handleAddSalary={handleAddSalary}
            />
          </div>

          <UpdateSalaryModal
            isOpen={isSalaryModalOpen}
            onClose={() => setSalaryModalOpen(false)}
            userId={selectedUser?.id}
            salaryData={currentSalary}
            handleUpdateSalary={handleUpdateSalary}
          />
          <DeleteComponent
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            deleteName={`Luong cua ${selectedUser?.name}`}
            handleDelete={handleDeleteSalary}
          />
          <Snackbar
            snackbarSeverity={snackbarSeverity}
            message={snackbarMessage}
            show={snackbarVisible}
            onClose={handleCloseSnackbar}
            autoHideDuration={5000}
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
