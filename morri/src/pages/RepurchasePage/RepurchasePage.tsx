import { Box } from "@mui/material";
import React, { useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import DeleteComponent from "../../component/DeleteComponent/DeleteComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";
import TableComponent from "../../component/TableComponent/TableComponent";
import Header from "../../component/Title_header/Header";
import AddBill from "./AddBill";
import "./RepurchasePage.css";

interface Column {
    field: string;
    headerName: string;
    width?: number;
    align?: "left" | "center" | "right";
}
const columns: Column[] = [
    { field: "id", headerName: "Mã phiếu" },
    { field: "name", headerName: "Tên trang sức" },
    { field: "type", headerName: "Loại sản phẩm" },
    { field: "status", headerName: "Tình trạng" },
    { field: "material", headerName: "Chất liệu" },
    { field: "total", headerName: "Tổng tiền" },
];

const data = [
    {
        id: "ML001",
        name: "Vòng bạc charm trái tim",
        type: "Vòng tay",
        status: "75%",
        material: "Bạc",
        total: "2.000.000 VNĐ",
    },
    {
        id: "ML002",
        name: "Dây chuyền kim cương xanh",
        type: "Dây chuyền",
        status: "85%",
        material: "Vàng",
        total: "3.750.000 VNĐ",
    },
    {
        id: "ML003",
        name: "Nhẫn kim cương",
        type: "Nhẫn",
        status: "77%",
        material: "Vàng",
        total: "3.240.000 VNĐ",
    },
];

const RepurchasePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("Khách hàng bán");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const handleSearch = (value: string) => {
    setSearchKeyword(value);
};

const handleDelete = async (): Promise<void> => {
    try {
    } catch (error) {
        console.error("Error deleting customer:", error);
    }
};

const handleUpdate = async (): Promise<void> => {
    try {
    } catch (error) {
        console.error("Error updating customer:", error);
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
            data={data}
            onRowClick={() => console.log("Row clicked:")}
            onEdit={() => setIsModalUpdateOpen(true)}
            onDelete={() => setIsDeleteModalOpen(true)}
        />

        <DeleteComponent
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            deleteName={"Jack"}
            handleDelete={handleDelete}
        />
        </div>
    );
};

export default RepurchasePage;
