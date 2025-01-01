import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import TextBox from "../../component/TextBox/TextBox";

interface AddBillProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
    [key: string]: string | number;
}

const AddBill: React.FC<AddBillProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [formValues, setFormValues] = useState<FormValues>({});

    const handleChange = (name: string) => (value: string | number) => {
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2,
                    width: "90%",
                    maxWidth: "1000px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                        color: "#264850",
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >
                    Phiếu Mua Hàng
                </div>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                }}>
                    {/* Row 1 */}
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2,
                        '& > *': { flex: 1 } 
                    }}>
                        <TextBox
                            datatype="string"
                            title="Số phiếu mua hàng *"
                            placeholder="Nhập số phiếu mua hàng"
                            onChange={handleChange('purchaseNumber')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="Tên sản phẩm *"
                            placeholder="Nhập tên sản phẩm"
                            onChange={handleChange('productName')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="date"
                            title="Ngày lập phiếu *"
                            placeholder="dd/mm/yyyy"
                            onChange={handleChange('purchaseDate')}
                            icon={<CalendarMonthIcon style={{ color: "black" }} />}
                            defaultValue=""
                        />
                    </Box>

                    {/* Row 2 */}
                    <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2,
                        '& > *': { flex: 1 } 
                    }}>
                        <TextBox
                            datatype="string"
                            title="Loại sản phẩm *"
                            placeholder="Nhập loại sản phẩm"
                            onChange={handleChange('productType')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="Họ tên khách hàng *"
                            placeholder="Nhập họ tên khách hàng"
                            onChange={handleChange('customerName')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="Mã khách hàng"
                            placeholder="Nhập mã khách hàng"
                            onChange={handleChange('customerId')}
                            defaultValue=""
                        />
                    </Box>

                    {/* Row 3 */}
                    <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2,
                        '& > *': { flex: 1 } 
                    }}>
                        <TextBox
                            datatype="number"
                            title="Số điện thoại *"
                            placeholder="Nhập số điện thoại khách hàng"
                            onChange={handleChange('phoneNumber')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="Chất liệu *"
                            placeholder="Nhập chất liệu sản phẩm"
                            onChange={handleChange('material')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="CCCD/CMND *"
                            placeholder="Nhập CCCD khách hàng"
                            onChange={handleChange('identityNumber')}
                            defaultValue=""
                        />
                    </Box>

                    {/* Row 4 */}
                    <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2,
                        '& > *': { flex: 1 } 
                    }}>
                        <TextBox
                            datatype="number"
                            title="Giá mua lại *"
                            placeholder="Nhập giá mua lại"
                            onChange={handleChange('buybackPrice')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="Tình trạng *"
                            placeholder="Nhập tình trạng (50 - 90%)"
                            onChange={handleChange('condition')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="Mã nhân viên *"
                            placeholder="Nhập mã nhân viên"
                            onChange={handleChange('employeeName')}
                            defaultValue=""
                        />
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginTop: "20px"
                }}>
                    <BtnComponent
                        btnColorType="close"
                        btnText={"Đóng"}
                        onClick={() => setIsModalOpen(false)}
                    />
                    <BtnComponent
                        btnColorType="primary"
                        btnText="Thêm phiếu"
                        onClick={() => {}}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default AddBill;