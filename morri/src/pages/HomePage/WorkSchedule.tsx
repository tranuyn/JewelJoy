import React, { useState, useEffect, useCallback } from "react";
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
  const [allSchedule, setAllSchedule] = useState<Schedule[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [scheduleData, setScheduleData] = useState<DaySchedule>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await scheduleService.getEmployees();
      setEmployees(data);
    } catch (error) {
      setError("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    const loadAllSchedule = async () => {
      try {
        setLoading(true);
        setAllSchedule(await scheduleService.getAllSchedule());
      } catch (error) {
        setError("Không thể tải tất cả lịch làm việc");
      } finally {
        setLoading(false);
      }
    };
    loadAllSchedule();
  }, []);

  const loadScheduleData = useCallback(async (date: string) => {
    try {
      setLoading(true);
      const schedules = await scheduleService.getScheduleByDate(date);

      if (schedules.length > 0) {
        const schedule = schedules[0];
        setCurrentSchedule(schedule);

        // Cập nhật scheduleData với dữ liệu từ API
        setScheduleData({
          morning: {
            employeeIds: schedule.morningShifts.map((emp) => emp.id),
            maxCapacity: 5,
          },
          afternoon: {
            employeeIds: schedule.afternoonShifts.map((emp) => emp.id),
            maxCapacity: 5,
          },
        });
      } else {
        // Reset data nếu không có lịch cho ngày được chọn
        setCurrentSchedule(null);
        setScheduleData({
          morning: { employeeIds: [], maxCapacity: 5 },
          afternoon: { employeeIds: [], maxCapacity: 5 },
        });
      }
    } catch (error) {
      setError("Không thể tải lịch làm việc");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadScheduleData(formatDate(selectedDate));
    }
  }, [selectedDate, loadScheduleData]);

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

  const handleEmployeeSelect = async (shift: ShiftType, employeeId: string) => {
    try {
      setLoading(true);

      if (currentSchedule) {
        // Chỉ gửi thông tin cần thiết
        const updateData = {
          workDate: currentSchedule.workDate,
          morningShifts:
            shift === "morning"
              ? [
                  ...currentSchedule.morningShifts.map((emp) => emp.id),
                  employeeId,
                ]
              : currentSchedule.morningShifts.map((emp) => emp.id),
          afternoonShifts:
            shift === "afternoon"
              ? [
                  ...currentSchedule.afternoonShifts.map((emp) => emp.id),
                  employeeId,
                ]
              : currentSchedule.afternoonShifts.map((emp) => emp.id),
        };

        await scheduleService.updateShiftSchedule(
          currentSchedule.id,
          updateData
        );
      } else {
        // Tạo lịch mới
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(3, 30, 0);
        console.log("Thời gian trong ngày: ", selectedDateTime.toISOString());
        const newSchedule = {
          workDate: selectedDateTime.toISOString(), // Sẽ cho ra định dạng ISO chuẩn UTC
          morningShifts: shift === "morning" ? [employeeId] : [],
          afternoonShifts: shift === "afternoon" ? [employeeId] : [],
        };

        await scheduleService.createSchedule(newSchedule);
      }

      // Tải lại dữ liệu sau khi cập nhật
      await loadScheduleData(formatDate(selectedDate));
    } catch (error) {
      setError("Không thể cập nhật lịch làm việc");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeRemove = async (shift: ShiftType, employeeId: string) => {
    if (!currentSchedule) return;

    try {
      setLoading(true);
      const updateData = {
        workDate: currentSchedule.workDate,
        morningShifts:
          shift === "morning"
            ? currentSchedule.morningShifts
                .filter((emp) => emp.id !== employeeId)
                .map((emp) => emp.id)
            : currentSchedule.morningShifts.map((emp) => emp.id),
        afternoonShifts:
          shift === "afternoon"
            ? currentSchedule.afternoonShifts
                .filter((emp) => emp.id !== employeeId)
                .map((emp) => emp.id)
            : currentSchedule.afternoonShifts.map((emp) => emp.id),
      };

      await scheduleService.updateShiftSchedule(currentSchedule.id, updateData);
      await loadScheduleData(formatDate(selectedDate));
    } catch (error) {
      setError("Không thể xóa nhân viên khỏi ca làm việc");
    } finally {
      setLoading(false);
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
                  : day && formatDate(day) === formatDate(new Date())
                  ? "currentDay"
                  : day &&
                    allSchedule.some(
                      (schedule) =>
                        formatDate(new Date(schedule.workDate)) ===
                        formatDate(day)
                    )
                  ? "workDay"
                  : ""
              } ${
                day &&
                formatDate(day) === formatDate(selectedDate) &&
                formatDate(day) === formatDate(new Date())
                  ? "selectedDay currentDay"
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
