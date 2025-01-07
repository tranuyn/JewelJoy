import React, { useState, useEffect } from "react";
import {
  Employee,
  Schedule,
  scheduleService,
} from "../../services/scheduleService";
import { EmployeeSelector } from "../../component/EmployeeSelector";
import "./WorkScheduleStyle.css";

type ShiftType = "morning" | "afternoon";

interface ShiftData {
  employeeIds: string[];
  maxCapacity: number;
}

interface DaySchedule {
  [key: string]: ShiftData;
}

const WorkSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [scheduleData, setScheduleData] = useState<DaySchedule>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await scheduleService.getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error loading employees:", error);
      }
    };
    loadEmployees();
  }, []);

  useEffect(() => {
    loadScheduleData(formatDate(selectedDate));
  }, [selectedDate]);

  const getDaysInMonth = (date: Date): { firstDay: Date; lastDay: Date } => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
  };

  const generateCalendarDays = (): (Date | null)[] => {
    const { firstDay, lastDay } = getDaysInMonth(currentMonth);
    const days: (Date | null)[] = [];
    const startDay = firstDay.getDay();

    for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }

    return days;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const loadScheduleData = async (date: string) => {
    try {
      setLoading(true);
      const schedules = await scheduleService.getScheduleByDate(date);
      console.log("lịch nè: ",schedules)

      // Tìm lịch làm việc cho ngày được chọn
      const daySchedule = schedules.find(
        (schedule) =>
          new Date(schedule.workDate).toDateString() ===
          new Date(date).toDateString()
      );

      const scheduleMap = {
        morning: {
          employeeIds:
            daySchedule?.morningShifts?.map((emp: Employee) => emp.id) || [],
          maxCapacity: 5,
        },
        afternoon: {
          employeeIds:
            daySchedule?.afternoonShifts?.map((emp: Employee) => emp.id) || [],
          maxCapacity: 5,
        },
      };

      setScheduleData(scheduleMap);
    } catch (error) {
      console.error("Error loading schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeSelect = async (shift: ShiftType, employeeId: string) => {
    const dateKey = formatDate(selectedDate);
    const currentShift = scheduleData[shift] || {
      employeeIds: [],
      maxCapacity: 5,
    };

    try {
      const selectedEmployee = employees.find((emp) => emp.id === employeeId);
      if (!selectedEmployee) return;

      const schedules = await scheduleService.getScheduleByDate(dateKey);
      const currentSchedule = schedules[0];

      const updatedSchedule: Schedule = {
        ...currentSchedule,
        [shift === "morning" ? "morningShifts" : "afternoonShifts"]: [
          ...(shift === "morning"
            ? currentSchedule.morningShifts
            : currentSchedule.afternoonShifts),
          selectedEmployee,
        ],
      };

      await scheduleService.updateShiftSchedule(dateKey, updatedSchedule);

      setScheduleData((prev) => ({
        ...prev,
        [shift]: {
          ...currentShift,
          employeeIds: [...currentShift.employeeIds, employeeId],
        },
      }));
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleEmployeeRemove = async (shift: ShiftType, employeeId: string) => {
    const dateKey = formatDate(selectedDate);
    const currentShift = scheduleData[shift] || {
      employeeIds: [],
      maxCapacity: 5,
    };

    try {
      const schedules = await scheduleService.getScheduleByDate(dateKey);
      const currentSchedule = schedules[0];

      const updatedSchedule: Schedule = {
        ...currentSchedule,
        [shift === "morning" ? "morningShifts" : "afternoonShifts"]: (shift ===
        "morning"
          ? currentSchedule.morningShifts
          : currentSchedule.afternoonShifts
        ).filter((emp) => emp.id !== employeeId),
      };

      await scheduleService.updateShiftSchedule(dateKey, updatedSchedule);

      setScheduleData((prev) => ({
        ...prev,
        [shift]: {
          ...currentShift,
          employeeIds: currentShift.employeeIds.filter(
            (id) => id !== employeeId
          ),
        },
      }));
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleMonthChange = (increment: number): void => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
  };

  return (
    <div className="container">
      <div className="calendarCard">
        <div className="calendarHeader">
          <span className="monthTitle">
            Tháng{" "}
            {currentMonth.toLocaleString("default", {
              month: "numeric",
            })}{" "}
            Năm {currentMonth.getFullYear()}
          </span>
          <div>
            <button
              className="navigationButton"
              onClick={() => handleMonthChange(-1)}
            >
              ←
            </button>
            <button
              className="navigationButton"
              onClick={() => handleMonthChange(1)}
            >
              →
            </button>
          </div>
        </div>
        <div className="calendarGrid">
          <div className="dayHeader">Mon</div>
          <div className="dayHeader">Tue</div>
          <div className="dayHeader">Wed</div>
          <div className="dayHeader">Thu</div>
          <div className="dayHeader">Fri</div>
          <div className="dayHeader">Sat</div>
          <div className="dayHeader">Sun</div>

          {generateCalendarDays().map((day, index) => (
            <div
              key={index}
              className={`dayCell ${
                day && formatDate(day) === formatDate(selectedDate)
                  ? "selectedDay"
                  : ""
              }`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>

      <div className="scheduleCard">
        <div className="scheduleHeader">
          Lịch làm việc của ngày {selectedDate.toLocaleDateString()}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {(["morning", "afternoon"] as const).map((shift) => {
              const shiftData = scheduleData[shift] || {
                employeeIds: [],
                maxCapacity: 5,
              };

              return (
                <div key={shift} className="shiftContainer">
                  <div className="shiftHeader">
                    <span className="shiftTitle">
                      {shift === "morning" ? "Ca sáng" : "Ca chiều"}
                    </span>
                  </div>
                  <div className="employeeCount">
                    Số nhân viên: {shiftData.employeeIds.length} /{" "}
                    {shiftData.maxCapacity}
                  </div>
                  <EmployeeSelector
                    employees={employees}
                    selectedEmployees={shiftData.employeeIds}
                    maxCapacity={shiftData.maxCapacity}
                    onEmployeeSelect={(employeeId) =>
                      handleEmployeeSelect(shift, employeeId)
                    }
                    onEmployeeRemove={(employeeId) =>
                      handleEmployeeRemove(shift, employeeId)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSchedule;
