// export interface Employee {
//   id: string;
//   username: string;
//   email: string;
//   name: string;
//   phoneNumber: string;
//   role: string;
// }

// export interface Schedule {
//   id: string;
//   workDate: string;
//   morningShifts: Employee[];
//   afternoonShifts: Employee[];
//   startTime: string;
//   endTime: string;
//   createdBy: string | null;
//   status: string;
// }

// export const scheduleService = {
//   // Lấy danh sách nhân viên
//   async getEmployees(): Promise<Employee[]> {
//     const response = await fetch("http://localhost:8081/user");
//     const data = await response.json();

//     // Transform the API data to match the Employee interface
//     return data.map((user: any) => ({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       phone: user.phoneNumber, // Map phoneNumber to phone
//     }));
//   },

//   // Lấy lịch làm việc theo ngày
//   async getScheduleByDate(date: string): Promise<Schedule[]> {
//     // Tạo ngày bắt đầu (đầu ngày) và ngày kết thúc (cuối ngày)
//     const startDate = new Date(date);
//     startDate.setHours(0, 0, 0, 0);

//     const endDate = new Date(date);
//     endDate.setHours(23, 59, 59, 999);

//     const response = await fetch(
//       `http://localhost:8081/schedule/range?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
//     );
//     return response.json();
//   },

//   // Cập nhật lịch làm việc
//   async updateShiftSchedule(
//     id: string,
//     schedule: Partial<Schedule>
//   ): Promise<Schedule> {
//     const response = await fetch(`http://localhost:8081/schedule/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(schedule),
//     });
//     return response.json();
//   },
// };

// scheduleService.ts
// Định nghĩa các interface
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

// Service implementation
export const scheduleService = {
  // Mock data cho employees
  mockEmployees: [
    {
      id: "1",
      username: "john_doe",
      email: "john@example.com",
      name: "John Doe",
      phoneNumber: "123456789",
      role: "STAFF",
    },
    {
      id: "2",
      username: "jane_smith",
      email: "jane@example.com",
      name: "Jane Smith",
      phoneNumber: "987654321",
      role: "STAFF",
    },
    {
      id: "3",
      username: "bob_wilson",
      email: "bob@example.com",
      name: "Bob Wilson",
      phoneNumber: "456789123",
      role: "STAFF",
    },
  ],

  // Mock data cho schedules
  mockSchedules: new Map<string, Schedule>(),

  async getEmployees(): Promise<Employee[]> {
    return Promise.resolve(this.mockEmployees);
  },

  async getScheduleByDate(date: string): Promise<Schedule[]> {
    let schedule = this.mockSchedules.get(date);

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
