import React, { useState, useEffect } from "react";
import TableComponent from "../../component/TableComponent/TableComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";

interface Employee {
  id: string;
  username: string;
  email: string;
  name: string;
  dateOfBirth: string;
  faceId: string | null;
  gender: string;
  phoneNumber: string;
  cccd: string | null;
  avaURL: string | null;
  address: string | null;
  ngayVaoLam: string | null;
  role: string;
  luongCoBan: string | null;
}

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  workingHours: number | null;
  notes: string;
  checkType: "IN" | "OUT";
  employee: Employee;
}

interface AbsenceRecord {
  id: string;
  date: string;
  employee: Employee;
  reason: string;
  status: string;
}

interface AttendanceData {
  id: string;
  employeeId: Employee;
  year: number;
  month: number;
  attendanceRecords: AttendanceRecord[];
  workingDays: number;
  absences: AbsenceRecord[];
  totalWorkingHours: number;
  totalAbsences: number;
  totalLateArrivals: number;
}

interface TableRow {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  reason: string;
  checkInTime: string;
  checkOutTime: string;
  workingHours: string;
  status: string;
}

const columns = [
  { field: "employeeId", headerName: "Mã nhân viên" },
  { field: "employeeName", headerName: "Tên nhân viên" },
  { field: "date", headerName: "Ngày" },
  { field: "reason", headerName: "Lý do" },
  { field: "checkInTime", headerName: "Giờ check-in" },
  { field: "checkOutTime", headerName: "Giờ check-out" },
  { field: "workingHours", headerName: "Số giờ làm việc" },
  { field: "status", headerName: "Trạng thái" },
];

const TongHop: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [users, setUsers] = useState<Employee[]>([]);
  const [allAttendanceData, setAllAttendanceData] = useState<
    Map<string, AttendanceData>
  >(new Map());
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8081/user/");
      const data: Employee[] = await response.json();
      const filteredUsers = data.filter((user) => user.role !== "ADMIN");
      setUsers(filteredUsers);
      return filteredUsers;
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
      return [];
    }
  };

  const fetchAttendanceData = async (
    employeeId: string,
    year: number,
    month: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8081/attendance/employee/${employeeId}/${year}/${month}`
      );
      const data: AttendanceData = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Error fetching attendance data for employee ${employeeId}:`,
        error
      );
      return null;
    }
  };

  const fetchAllAttendanceData = async () => {
    setLoading(true);
    try {
      const allUsers = await fetchUsers();
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const attendanceMap = new Map<string, AttendanceData>();

      // Fetch attendance data for all users
      await Promise.all(
        allUsers.map(async (user) => {
          const attendanceData = await fetchAttendanceData(
            user.id,
            year,
            month
          );
          if (attendanceData) {
            attendanceMap.set(user.id, attendanceData);
          }
        })
      );

      setAllAttendanceData(attendanceMap);
      setError(null);
    } catch (err) {
      setError("Failed to fetch attendance data");
      console.error("Error fetching all attendance data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAttendanceData();
  }, []);

  const formatTableData = (): TableRow[] => {
    const allRows: TableRow[] = [];

    allAttendanceData.forEach((data) => {
      if (!data) return;

      const hasAttendanceRecords =
        data.attendanceRecords && data.attendanceRecords.length > 0;
      const hasAbsences = data.absences && data.absences.length > 0;

      if (!hasAttendanceRecords && !hasAbsences) return;

      if (hasAttendanceRecords) {
        const attendanceRows = data.attendanceRecords.map(
          (record): TableRow => ({
            id: record.id,
            employeeId: record.employee?.id || "",
            employeeName: record.employee?.name || "",
            date: record.date
              ? new Date(record.date).toLocaleDateString()
              : "-",
            reason: record.notes || "",
            checkInTime: record.checkIn
              ? new Date(record.checkIn).toLocaleTimeString()
              : "-",
            checkOutTime: record.checkOut
              ? new Date(record.checkOut).toLocaleTimeString()
              : "-",
            workingHours: record.workingHours?.toString() || "-",
            status: record.status || "",
          })
        );
        allRows.push(...attendanceRows);
      }
      if (hasAbsences) {
        const absenceRows = data.absences.map(
          (absence): TableRow => ({
            id: absence.id,
            employeeId: absence.employee?.id || "",
            employeeName: absence.employee?.name || "",
            date: absence.date
              ? new Date(absence.date).toLocaleDateString()
              : "-",
            reason: absence.reason || "",
            checkInTime: "-",
            checkOutTime: "-",
            workingHours: "0",
            status: "ABSENT",
          })
        );
        allRows.push(...absenceRows);
      }
    });

    return allRows;
  };

  const handleEdit = (row: TableRow) => {
    setSelectedRow(row);
    setIsModalUpdateOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedRow) return;
    try {
      // Implement delete logic here
      console.log("Deleting row:", selectedRow);
      setIsDeleteModalOpen(false);
      // Refresh data after deletion
      await fetchAllAttendanceData();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleDeleteOpen = (row: TableRow) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const tableData = formatTableData();
  const filteredData = selectedDate
    ? tableData.filter(
        (row) =>
          new Date(row.date).toDateString() === selectedDate.toDateString()
      )
    : tableData;

  return (
    <>
      <div>
        <h3>Chào buổi sáng! Hôm nay là ngày {getCurrentDate()}</h3>
        <div className="content-wrapper">
          <div className="calendar-container">
            <Calendar
              onChange={(date) => setSelectedDate(date as Date)}
              value={selectedDate}
              tileClassName={({ date, view }) =>
                view === "month" &&
                tableData.some(
                  (item) =>
                    new Date(item.date).toDateString() === date.toDateString()
                )
                  ? "has-absence"
                  : ""
              }
            />
          </div>
          <TableComponent
            columns={columns}
            data={filteredData}
            onRowClick={(row) => setSelectedRow(row as TableRow)}
            onEdit={() => handleEdit}
            onDelete={() => handleDeleteOpen}
          />
          <DeleteComponent
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            deleteName={selectedRow?.employeeName || ""}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default TongHop;
