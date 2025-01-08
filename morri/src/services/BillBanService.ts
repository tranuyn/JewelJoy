// src/services/BillBanService.ts

interface Customer {
  id: string;
  name: string;
  gioiTinh: string;
  phoneNumber: string;
  dateOfBirth: string;
  role: string;
  ngayDangKyThanhVien: string | null;
  email: string | null;
  password: string | null;
  danhSachSanPhamDaMua: string[];
}

interface Staff {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  faceId: string | null;
  gender: string;
  phoneNumber: string;
  cccd: string;
  avaURL: string;
  address: string;
  ngayVaoLam: string;
  role: string;
  luongCoBan: string;
}

interface Product {
  id: string;
  name: string; 
  code: string;
  description: string;
  material: string;
  costPrice: number;
  sellingPrice: number;
  imageUrl: string[];
  loaiSanPham: string;
  quantity: number;
  weight: number;
  status: string;
  chiPhiPhatSinh: string;
  supplierId: string | null;
  entryDate: string | null;
}

export interface OrderDetail {
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  id: string;
}

export interface BillBan {
  id: string;
  totalPrice: number;
  status: "ON_DELIVERY" | "COMPLETED" | "CANCELLED";
  paymentMethod: string;
  customer: Customer;
  orderDetails: OrderDetail[];
  staff: Staff;
  additionalCharge: number;
  createAt: string;
  note: string;
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
  status: "ON_DELIVERY" | "COMPLETED"| "CANCELLED";
}
export interface UpdateOrderDetail {
  id: string;
  product: string; // Chỉ cần ID của product
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
export interface UpdateBillBan {
  totalPrice: number;
  status: "ON_DELIVERY" | "COMPLETED" | "CANCELLED";
  paymentMethod: string;
  customer: string; // Chỉ cần ID của customer
  orderDetails: UpdateOrderDetail[];
  staff: string; // Chỉ cần ID của staff
  additionalCharge: number;
  createAt: string;
  note: string;
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
    customer: bill.customer?.name || "Unknown",
    customerId: bill.customer?.id || "",
    staffName: bill.staff?.username || "Unknown",
    staffId: bill.staff?.id || "",
    order: bill.orderDetails?.length || 0,
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
export const createBillBan = async (
  billBan: Omit<BillBan, "id">
): Promise<BillBan> => {
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
  updatedBillBan: UpdateBillBan // Sử dụng interface mới
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