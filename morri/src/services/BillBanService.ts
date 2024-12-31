// src/services/BillBanService.ts

interface Customer {
  name: string;
}

interface BillBan {
  id: string;
  customer: Customer;
  orderDetails: any[];
  createdAt: string;
}

// Định nghĩa interface cho phản hồi API của bạn
export interface BillBanResponse {
  code: string;
  customer: string;
  order: number;
  date: string;
  options: number;
}

const BASE_URL = "http://localhost:8081/billBan";

// Hàm lấy tất cả đơn hàng
export const getAllBillBans = async (): Promise<BillBanResponse[]> => {
  const response = await fetch(`${BASE_URL}/`);
  if (!response.ok) {
    throw new Error("Không thể tải dữ liệu đơn hàng!");
  }
  const data: BillBan[] = await response.json();

  return data.map((bill) => ({
    code: bill.id,
    customer: bill.customer.name,
    order: bill.orderDetails.length,
    date: new Date(bill.createdAt).toLocaleDateString(),
    options: 0, // Tạm thời để 0
  }));
};

// Hàm lấy đơn hàng theo ID
export const getBillBanById = async (billBanId: string): Promise<BillBan> => {
  const response = await fetch(`${BASE_URL}/${billBanId}`);
  if (!response.ok) {
    throw new Error("Không thể tìm thấy đơn hàng!");
  }
  return await response.json();
};

// Hàm tạo đơn hàng
export const createBillBan = async (billBan: BillBan): Promise<BillBan> => {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(billBan),
  });

  if (!response.ok) {
    throw new Error("Không thể tạo đơn hàng!");
  }

  return await response.json();
};

// Hàm cập nhật đơn hàng
export const updateBillBan = async (
  billBanId: string,
  updatedBillBan: BillBan
): Promise<BillBan> => {
  const response = await fetch(`${BASE_URL}/update/${billBanId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBillBan),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật đơn hàng!");
  }

  return await response.json();
};
