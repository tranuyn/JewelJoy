// import { Box } from "@mui/material";
// import React, { useState } from "react";
// import BtnComponent from "../../component/BtnComponent/BtnComponent";
// import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
// import SearchComponent from "../../component/SearchComponent/SearchComponent";
// import TableComponent from "../../component/TableComponent/TableComponent";
// import Header from "../../component/Title_header/Header";
// import AddBill from "./AddBill";
// import "./RepurchasePage.css";

// interface Column {
//     field: string;
//     headerName: string;
//     width?: number;
//     align?: "left" | "center" | "right";
// }
// const columns: Column[] = [
//     { field: "id", headerName: "Mã phiếu" },
//     { field: "name", headerName: "Tên trang sức" },
//     { field: "type", headerName: "Loại sản phẩm" },
//     { field: "status", headerName: "Tình trạng" },
//     { field: "material", headerName: "Chất liệu" },
//     { field: "total", headerName: "Tổng tiền" },
// ];

// const data = [
//     {
//         id: "ML001",
//         name: "Vòng bạc charm trái tim",
//         type: "Vòng tay",
//         status: "75%",
//         material: "Bạc",
//         total: "2.000.000 VNĐ",
//     },
//     {
//         id: "ML002",
//         name: "Dây chuyền kim cương xanh",
//         type: "Dây chuyền",
//         status: "85%",
//         material: "Vàng",
//         total: "3.750.000 VNĐ",
//     },
//     {
//         id: "ML003",
//         name: "Nhẫn kim cương",
//         type: "Nhẫn",
//         status: "77%",
//         material: "Vàng",
//         total: "3.240.000 VNĐ",
//     },
// ];

// const RepurchasePage: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<string>("Khách hàng bán");
//     const [searchKeyword, setSearchKeyword] = useState("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
//     const handleSearch = (value: string) => {
//     setSearchKeyword(value);
// };

// const handleDelete = async (): Promise<void> => {
//     try {
//     } catch (error) {
//         console.error("Error deleting customer:", error);
//     }
// };

// const handleUpdate = async (): Promise<void> => {
//     try {
//     } catch (error) {
//         console.error("Error updating customer:", error);
//     }
// };

// return (
//     <div className="customer-management">
//         <Header title="Quản lý hàng mua lại" />
//         <div style={{ padding: "10px" }}></div>

//         <Box
//             sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             gap: 3,
//             marginLeft: "20px",
//             }}
//         >
//             <BtnComponent
//             btnColorType="primary"
//             btnText={"Lập phiếu mua"}
//             onClick={() => setIsModalOpen(true)}
//             />
//             <AddBill
//             isModalOpen={isModalOpen}
//             setIsModalOpen={setIsModalOpen}
//             />
        
//             <SearchComponent
//             placeholder={"Tìm mã phiếu"}
//             keyword={searchKeyword}
//             onSearch={handleSearch}
//             />
//         </Box>
//         <div style={{ padding: "10px" }}></div>
//         <TableComponent
//             columns={columns}
//             data={data}
//             onRowClick={() => console.log("Row clicked:")}
//             onEdit={() => setIsModalUpdateOpen(true)}
//             onDelete={() => setIsDeleteModalOpen(true)}
//         />

//         <DeleteComponent
//             isModalOpen={isDeleteModalOpen}
//             setIsModalOpen={setIsDeleteModalOpen}
//             deleteName={"Jack"}
//             handleDelete={handleDelete}
//         />
//         </div>
//     );
// };

// export default RepurchasePage;
import { Box } from "@mui/material";
import React, { useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import TableComponent from "../../component/TableComponent/TableComponent";
import Header from "../../component/Title_header/Header";
import AddBill from "./AddBill";
import "./RepurchasePage.css";
import { Bill, Column, FormValues } from "./types";

const columns: Column[] = [
    { field: "id", headerName: "Mã phiếu" },
    { field: "name", headerName: "Tên trang sức" },
    { field: "type", headerName: "Loại sản phẩm" },
    { field: "status", headerName: "Tình trạng" },
    { field: "material", headerName: "Chất liệu" },
    { field: "total", headerName: "Tổng tiền" },
];

const initialBills: Bill[] = [
    {
        id: "ML001",
        name: "Vòng bạc charm trái tim",
        type: "Vòng tay",
        status: "75%",
        material: "Bạc",
        total: "2.000.000 VNĐ",
        customerName: "Nguyễn Văn A",
        customerId: "KH001",
        phoneNumber: "0123456789",
        identityNumber: "123456789",
        purchaseDate: "2024-01-03",
        employeeName: "NV001"
    },
];

const RepurchasePage: React.FC = () => {
    const [bills, setBills] = useState<Bill[]>(initialBills);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleAddBill = (formValues: FormValues) => {
        const newBill: Bill = {
            id: `ML${String(bills.length + 1).padStart(3, '0')}`,
            name: formValues.productName as string,
            type: formValues.productType as string,
            status: formValues.condition as string,
            material: formValues.material as string,
            total: formatCurrency(Number(formValues.buybackPrice)),
            customerName: formValues.customerName as string,
            customerId: formValues.customerId as string,
            phoneNumber: formValues.phoneNumber as string,
            identityNumber: formValues.identityNumber as string,
            purchaseDate: formValues.purchaseDate as string,
            employeeName: formValues.employeeName as string
        };

        setBills(prevBills => [...prevBills, newBill]);
    };

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
    };

    const filteredBills = bills.filter(bill =>
        bill.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        bill.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const handleDelete = async (): Promise<void> => {
        if (selectedBill) {
            try {
                setBills(prevBills => prevBills.filter(bill => bill.id !== selectedBill.id));
                setIsDeleteModalOpen(false);
                setSelectedBill(null);
            } catch (error) {
                console.error("Error deleting bill:", error);
            }
        }
    };

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

                <SearchComponent
                    placeholder={"Tìm mã phiếu"}
                    keyword={searchKeyword}
                    onSearch={handleSearch}
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
                deleteName={selectedBill?.name || ""}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default RepurchasePage;
