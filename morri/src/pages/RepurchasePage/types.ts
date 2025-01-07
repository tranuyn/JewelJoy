
export interface FormValues {
    [key: string]: string | number;
}

export interface Bill {
    id: string;
    name: string;
    type: string;
    status: string;
    material: string;
    total: string;
    customerName: string;
    customerId: string;
    phoneNumber: string;
    identityNumber: string;
    purchaseDate: string;
    employeeName: string;
}

export interface Column {
    field: string;
    headerName: string;
    width?: number;
    align?: "left" | "center" | "right";
}