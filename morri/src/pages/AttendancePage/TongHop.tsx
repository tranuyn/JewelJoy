import React, { useState } from "react";
import TableComponent from "../../component/TableComponent/TableComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
interface AbsenceData {
  employeeId: string;
  absenceDate: string;
  reason: string;
  employeeName: string;
}

interface Column {
  field: string;
  headerName: string;
}

const columns: Column[] = [
  { field: "employeeId", headerName: "Mã nhân viên" },
  { field: "employeeName", headerName: "Tên nhân viên" },
  { field: "absenceDate", headerName: "Ngày nghỉ" },
  { field: "reason", headerName: "Lý do" },
];

const data: AbsenceData[] = [
  {
    employeeId: "1234324",
    absenceDate: "2024-05-18",
    reason: "Vacation",
    employeeName: "J97",
  },
  {
    employeeId: "1234324",
    absenceDate: "2024-05-18",
    reason: "Sick Leave",
    employeeName: "J97",
  },
  {
    employeeId: "1234324",
    absenceDate: "2024-05-19",
    reason: "Personal",
    employeeName: "J97",
  },
  {
    employeeId: "1234324",
    absenceDate: "2024-05-20",
    reason: "Meeting",
    employeeName: "J97",
  },
];
const TongHop = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [isModalUpdateOpen, setIsModalUpdateOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const filteredData = selectedDate
    ? data.filter(
        (item) =>
          new Date(item.absenceDate).toLocaleDateString() ===
          selectedDate.toLocaleDateString()
      )
    : data;

  return (
    <>
      <div>
        <h3>Chào buổi sáng! Hôm nay là ngày **/**/*****</h3>
        {/* calendar section */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 13,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="calendar">
            <Calendar
              onChange={(date) => setSelectedDate(date as Date)}
              value={selectedDate}
              tileClassName={({ date, view }) =>
                view === "month" &&
                selectedDate &&
                date.toDateString() === selectedDate.toDateString()
                  ? "highlight"
                  : ""
              }
            />
          </div>
          {/* table section */}
          <div className="table">
            <TableComponent
              columns={columns}
              data={data}
              onRowClick={(row) => console.log("Row clicked:", row)}
              onEdit={(row) => setIsModalUpdateOpen(true)}
              onDelete={(row) => setIsDeleteModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TongHop;
