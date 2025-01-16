import React, { useState, useEffect, useCallback } from "react";
import {
  Employee,
  Schedule,
  scheduleService,
} from "../../services/scheduleService";
import "./WorkScheduleStyle.css";

const ViewOnlyWorkSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);
  const [allSchedule, setAllSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const loadScheduleData = useCallback(async (date: string) => {
    try {
      setLoading(true);
      const schedules = await scheduleService.getScheduleByDate(date);
      if (schedules.length > 0) {
        setCurrentSchedule(schedules[0]);
      } else {
        setCurrentSchedule(null);
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
            Tháng {currentMonth.toLocaleString("default", { month: "numeric" })}{" "}
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
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div>
            <div className="shiftContainer">
              <div className="shiftHeader">
                <span className="shiftTitle">Ca sáng (7:30 - 14:30)</span>
              </div>
              <div className="employeeList">
                {currentSchedule?.morningShifts?.length ? (
                  currentSchedule.morningShifts.map((employee) => (
                    <div key={employee.id} className="employeeItem">
                      {employee.name}
                    </div>
                  ))
                ) : (
                  <div className="noEmployee">Không có nhân viên làm việc</div>
                )}
              </div>
            </div>

            <div className="shiftContainer">
              <div className="shiftHeader">
                <span className="shiftTitle">Ca chiều (14:30 - 21:30)</span>
              </div>
              <div className="employeeList">
                {currentSchedule?.afternoonShifts?.length ? (
                  currentSchedule.afternoonShifts.map((employee) => (
                    <div key={employee.id} className="employeeItem">
                      {employee.name}
                    </div>
                  ))
                ) : (
                  <div className="noEmployee">Không có nhân viên làm việc</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOnlyWorkSchedule;
