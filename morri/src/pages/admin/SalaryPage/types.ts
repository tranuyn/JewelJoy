// export interface BonusPenaltyRecord {
//     id?: string;
//     type: "BONUS" | "PENALTY";
//     amount: number;
//     reason: string|number;
//     date: string|number;
//   }

//   export interface Salary {
//     id: string;
//     employeeId: string;
//     baseSalary: number;
//     calculatedBasePay: number;
//     totalBonusAndPenalty: number;
//     totalSalary: number;
//     salaryReceiveDate: string;
//     bonusRecords: BonusPenaltyRecord[];
//   }
export interface BonusPenaltyRecord {
  id?: string;
  type: "BONUS" | "PENALTY";
  amount: number;
  reason: string | number;
  date: string | number;
}
export interface EmployeeDetails {
  id: string;
  username: string;
  email: string;
  name: string;
  dateOfBirth: string;
  faceId: string | null;
  gender: string;
  phoneNumber: string;
  cccd: string;
  avaURL: string | null;
  address: string;
  ngayVaoLam: string;
  role: string;
  luongCoBan: string;
}

// export interface Salary {
//   id: string;
//   employeeId: string;
//   staffName?: string;
//   totalSalary: number;
//   totalThuong: number;
//   totalPhat: number;
//   salaryDate: string;
//   totalFlower: number;
//   bonusRecords?: BonusPenaltyRecord[];
// }
export interface Salary {
  id: string;
  employeeId: EmployeeDetails;
  salaryReceiveDate: string;
  workingDays: number;
  productsCompleted: number;
  baseSalary: number;
  hourlyRate: number;
  commissionRate: number;
  bonusRecords: BonusPenaltyRecord[];
  totalBonusAndPenalty: number;
  salaryCommissionBased: number;
  salaryHourlyBased: number;
  salaryDailyBased: number;
  calculatedBasePay: number;
  totalSalary: number;
  createdAt: string | null;
}
