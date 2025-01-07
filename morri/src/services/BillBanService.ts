// src/services/BillBanService.ts

interface Customer {
  name: string;
  id: string;
}
interface Staff {
  username: string;
  id: string;
}

interface Product {
  id: string;
  name: string;
  code: string;
  sellingPrice: number;
  imageUrl: string[];
}

export interface OrderDetail {
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface BillBan {
  id: string;
  customer: Customer;
  staff: Staff;
  orderDetails: OrderDetail[];
  createAt: string;
  totalPrice: number;
  status: "ON_DELIVERY" | "COMPLETED";
}

export interface BillBanResponse {
  code: string;
  customer: string;
  customerId: string;
  staffName: string;
  staffId: string;
  order: number;
  date: string;
  dateTime: string;
  options: number;
  orderDetails: OrderDetail[];
  totalPrice: number;
  status: "ON_DELIVERY" | "COMPLETED";
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
    customerId: bill.customer.id,
    staffName: bill.staff.username,
    staffId: bill.staff.id,
    order: bill.orderDetails.length,
    dateTime: bill.createAt,
    date: new Date(bill.createAt).toLocaleDateString(),
    options: 0,
    orderDetails: bill.orderDetails,
    totalPrice: bill.totalPrice,
    status: bill.status,
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
    const errorData = await response.text();
    console.error("Server response:", errorData);
    throw new Error("Không thể cập nhật đơn hàng!");
  }

  return await response.json();
};
