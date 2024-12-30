import React from "react";
import { Employee } from "../services/scheduleService";
import '../pages/HomePage/WorkScheduleStyle.css'

interface EmployeeSelectorProps {
  employees: Employee[];
  selectedEmployees: string[];
  maxCapacity: number;
  onEmployeeSelect: (employeeId: string) => void;
  onEmployeeRemove: (employeeId: string) => void;
}

export const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  employees,
  selectedEmployees,
  maxCapacity,
  onEmployeeSelect,
  onEmployeeRemove,
}) => {
  const availableEmployees = employees.filter(
    (emp) => !selectedEmployees.includes(emp.id)
  );

  return (
    <div className="employee-selector">
      {selectedEmployees.length < maxCapacity && (
        <div className="employee-dropdown">
          <select onChange={(e) => onEmployeeSelect(e.target.value)} value="">
            <option value="" disabled>
              Chọn nhân viên
            </option>
            {availableEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="selected-employees">
        {selectedEmployees.map((empId) => {
          const employee = employees.find((e) => e.id === empId);
          return employee ? (
            <div key={empId} className="employee-tag">
              {employee.name}
              <button
                className="remove-button"
                onClick={() => onEmployeeRemove(empId)}
              >
                ×
              </button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};
