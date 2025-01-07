// scheduleService.ts
import axios from "axios";

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

export const scheduleService = {
  // Lấy danh sách nhân viên từ API
  async getEmployees(): Promise<Employee[]> {
    try {
      const response = await axios.get("http://localhost:8081/user/");
      // Chuyển đổi dữ liệu API thành định dạng Employee
      const employees: Employee[] = response.data.map((user: any) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }));
      return employees;
    } catch (error) {
      console.error("Error loading employees from API:", error);
      throw error;
    }
  },

  // Mock data cho schedules
  mockSchedules: new Map<string, Schedule>(),

  async getScheduleByDate(date: string): Promise<Schedule[]> {
    let schedule = this.mockSchedules.get(date);
    console.log("tôi gọi đây")

    if (!schedule) {
      schedule = {
        id: date,
        workDate: date,
        morningShifts: [],
        afternoonShifts: [],
        startTime: "09:00:00",
        endTime: "17:00:00",
        createdBy: null,
        status: "ACTIVE",
      };
      this.mockSchedules.set(date, schedule);
    }

    return Promise.resolve([schedule]);
  },

  async updateShiftSchedule(
    id: string,
    schedule: Partial<Schedule>
  ): Promise<Schedule> {
    const existingSchedule = this.mockSchedules.get(id) || {
      id,
      workDate: id,
      morningShifts: [],
      afternoonShifts: [],
      startTime: "09:00:00",
      endTime: "17:00:00",
      createdBy: null,
      status: "ACTIVE",
    };

    const updatedSchedule = {
      ...existingSchedule,
      ...schedule,
    } as Schedule;

    this.mockSchedules.set(id, updatedSchedule);
    return Promise.resolve(updatedSchedule);
  },
};