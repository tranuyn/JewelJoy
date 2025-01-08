// scheduleService.ts

export interface Employee {
  id: string;
  username: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export interface Schedule {
  id: string;
  workDate: string;
  morningShifts: Employee[];
  afternoonShifts: Employee[];
  startTime: string;
  endTime: string;
  createdBy: string | null;
  status: string;
}

export interface ScheduleUpdate {
  workDate: string;
  morningShifts: string[];
  afternoonShifts: string[];
}

export const scheduleService = {
  async getEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch("http://localhost:8081/user/");
      if (!response.ok) {
        throw new Error("Lỗi khi tải danh sách nhân viên");
      }
      return await response.json();
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
      throw error;
    }
  },

  async getScheduleByDate(date: string): Promise<Schedule[]> {
    try {
      // Lấy tất cả lịch
      const response = await fetch("http://localhost:8081/schedule");
      if (!response.ok) {
        throw new Error("Lỗi khi tải lịch làm việc");
      }
      const allSchedules: Schedule[] = await response.json();

      // Tìm lịch cho ngày được chọn
      const selectedDateSchedule = allSchedules.find((schedule) => {
        const scheduleDate = new Date(schedule.workDate).toDateString();
        const targetDate = new Date(date).toDateString();
        return scheduleDate === targetDate;
      });

      return selectedDateSchedule ? [selectedDateSchedule] : [];
    } catch (error) {
      console.error("Lỗi khi tải lịch làm việc:", error);
      throw error;
    }
  },

  async updateShiftSchedule(
    id: string,
    schedule: ScheduleUpdate // Sử dụng interface mới
  ): Promise<Schedule> {
    try {
      const response = await fetch(`http://localhost:8081/schedule/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
      });
      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật lịch");
      }
      return await response.json();
    } catch (error) {
      console.error("Lỗi khi cập nhật lịch:", error);
      throw error;
    }
  },

  async createSchedule(schedule: ScheduleUpdate): Promise<Schedule> {
    try {
      const response = await fetch("http://localhost:8081/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
      });
      if (!response.ok) {
        throw new Error("Lỗi khi tạo lịch mới");
      }
      return await response.json();
    } catch (error) {
      console.error("Lỗi khi tạo lịch mới:", error);
      throw error;
    }
    // Tương tự như trên
  }
};
