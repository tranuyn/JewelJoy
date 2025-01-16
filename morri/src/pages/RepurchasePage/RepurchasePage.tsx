import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import TableComponent from "../../component/TableComponent/TableComponent";
import Header from "../../component/Title_header/Header";
import AddBill from "./AddBill";
import "./RepurchasePage.css";
import { Bill, Column, FormValues } from "./types";

const columns: Column[] = [
    { field: "id", headerName: "Mã phiếu" },
    { field: "customerName", headerName: "Tên khách hàng" },
    { field: "totalPrice", headerName: "Tổng tiền" },
    { field: "status", headerName: "Tình trạng" },
    { field: "staffName", headerName: "Nhân viên" },
    { field: "createdAt", headerName: "Ngày tạo" }
];

const RepurchasePage: React.FC = () => {
    const [bills, setBills] = useState<Bill[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {
        try {
            const response = await fetch('http://localhost:8081/billMua');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Transform the data to match the table structure
            const transformedData = data.map((bill: any) => ({
                id: bill.id,
                customerName: bill.customerName || bill.customerId?.name || 'N/A',
                totalPrice: formatCurrency(bill.totalPrice),
                status: bill.status.toString(),
                staffName: bill.staffId?.name || 'N/A',
                createdAt: new Date(bill.createdAt).toLocaleDateString('vi-VN') || 'N/A'
            }));
            
            setBills(transformedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching bills:", error);
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleAddBill = (formValues: FormValues) => {
        // Implement add bill logic here
       fetchBills(); // Refresh the data after adding
       
    };

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
    };

    const filteredBills = bills.filter(bill =>
        bill.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        bill.customerName.toLowerCase().includes(searchKeyword.toLowerCase())
    );


    const handleDelete = async (): Promise<void> => {
        if (!selectedBill) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:8081/billMua/${selectedBill.id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete bill');
            }
            
            setBills(prevBills => prevBills.filter(bill => bill.id !== selectedBill.id));
            setIsDeleteModalOpen(false);
            setSelectedBill(null);
            
            alert("Xóa phiếu mua thành công!");
        } catch (error) {
            console.error("Error deleting bill:", error);
            alert("Không thể xóa phiếu mua. Vui lòng thử lại sau.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    

    return (
        <div className="customer-management">
            <Header title="Quản lý hàng mua lại" />
            <div style={{ padding: "10px" }}></div>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: 3,
                    marginLeft: "20px",
                }}
            >
                <BtnComponent
                    btnColorType="primary"
                    btnText={"Lập phiếu mua"}
                    onClick={() => setIsModalOpen(true)}
                />
                <AddBill
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onSubmit={handleAddBill}
                />
            </Box>
            
            <div style={{ padding: "10px" }}></div>
            
            <TableComponent
                columns={columns}
                data={filteredBills}
                onRowClick={(row) => setSelectedBill(row as Bill)}
                onEdit={() => {
                    // Handle edit functionality if needed
                }}
                onDelete={() => {
                    setSelectedBill(selectedBill);
                    setIsDeleteModalOpen(true);
                }}
            />

            <DeleteComponent
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                deleteName={selectedBill?.id || ""}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default RepurchasePage;