import React, { useState, useEffect } from "react";
import TableComponent from "../../component/TableComponent/TableComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
import axios from "axios";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";

interface Employee {
  id: string;
  username: string;
  email: string;
  name: string;
  dateOfBirth: string;
  faceId: string;
  gender: string;
  phoneNumber: string;
  cccd: string;
  avaURL: string | null;
  address: string;
  ngayVaoLam: string | null;
  role: string;
  luongCoBan: number | null;
}

interface AbsenceData {
  id: string;
  date: string;
  employeeId: Employee;
  reason: string;
  status: string;
}

interface Column {
  field: string;
  headerName: string;
}

const columns: Column[] = [
  { field: "employeeId", headerName: "Mã nhân viên" },
  { field: "employeeName", headerName: "Tên nhân viên" },
  { field: "date", headerName: "Ngày nghỉ" },
  { field: "reason", headerName: "Lý do" },
  { field: "status", headerName: "Trạng thái" },
];

const TongHop = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [absenceData, setAbsenceData] = useState<AbsenceData[]>([]);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AbsenceData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbsenceData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/absence", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM1OTEwNzA5LCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzU5NDY3MDl9.pipHtJxuHc-IE65zSBbMmN3hLMfHWCGUjg_om_lnJls`,
          },
        });
        setAbsenceData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch absence data");
        console.error("Error fetching absence data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsenceData();
  }, []);

  const formatTableData = (data: AbsenceData[]) => {
    return data.map((item) => ({
      id: item.id,
      employeeId: item.employeeId.id,
      employeeName: item.employeeId.name,
      date: new Date(item.date).toLocaleDateString("vi-VN"),
      reason: item.reason,
      status: item.status,
    }));
  };

  const filteredData = selectedDate
    ? absenceData.filter(
        (item) =>
          new Date(item.date).toLocaleDateString() ===
          selectedDate.toLocaleDateString()
      )
    : absenceData;

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row);
  };

  const handleEdit = (row: any) => {
    setIsModalUpdateOpen(true);
  };
  const handleUpdate = async (updatedData: AbsenceData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8080/absence/${updatedData.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM1OTEwNzA5LCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzU5NDY3MDl9.pipHtJxuHc-IE65zSBbMmN3hLMfHWCGUjg_om_lnJls`,
          },
        }
      );
      const updatedIndex = absenceData.findIndex(
        (item) => item.id === updatedData.id
      );
      const newAbsenceData = [...absenceData];
      newAbsenceData[updatedIndex] = response.data;
      setAbsenceData(newAbsenceData);
      setIsModalUpdateOpen(false);
      setError(null);
    } catch (err) {
      setError("Failed to update absence data");
      console.error("Error updating absence data:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteOpen = async () => {
    setIsDeleteModalOpen(true);
  };
  const handleDelete = async () => {
    if (!selectedRow?.id) {
      // Add null check
      setError("No row selected for deletion");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/absence/${selectedRow.id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjUyMDk1N0BjaHQuZWR1LnZuIiwiaWF0IjoxNzM1OTEwNzA5LCJyb2xlIjoiQURNSU4iLCJleHAiOjE3MzU5NDY3MDl9.pipHtJxuHc-IE65zSBbMmN3hLMfHWCGUjg_om_lnJls`,
        },
      });

      const newAbsenceData = absenceData.filter(
        (item) => item.id !== selectedRow.id
      );
      setAbsenceData(newAbsenceData);
      setIsDeleteModalOpen(false);
      setSelectedRow(null);
      setError(null);
    } catch (err) {
      setError("Failed to delete absence data");
      console.error("Error deleting absence data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
                absenceData.some(
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
            data={formatTableData(filteredData)}
            onRowClick={(row) => setSelectedRow(row as unknown as AbsenceData)}
            // onRowClick={handleRowClick}
            onEdit={handleEdit}
            onDelete={handleDeleteOpen}
          />
          <DeleteComponent
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            deleteName={selectedRow?.employeeId?.name || ""} // Show employee name instead of ID
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default TongHop;
