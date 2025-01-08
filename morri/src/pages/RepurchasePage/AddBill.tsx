// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { Box, Modal } from "@mui/material";
// import React, { useState } from "react";
// import BtnComponent from "../../component/BtnComponent/BtnComponent";
// import TextBox from "../../component/TextBox/TextBox";

// interface AddBillProps {
//     isModalOpen: boolean;
//     setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// interface FormValues {
//     [key: string]: string | number;
// }

// const AddBill: React.FC<AddBillProps> = ({ isModalOpen, setIsModalOpen }) => {
//     const [formValues, setFormValues] = useState<FormValues>({});

//     const handleChange = (name: string) => (value: string | number) => {
//         setFormValues(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     return (
//         <Modal
//             open={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//         >
//             <Box
//                 sx={{
//                     backgroundColor: "white",
//                     padding: 4,
//                     borderRadius: 2,
//                     width: "90%",
//                     maxWidth: "1000px",
//                     maxHeight: "90vh",
//                     overflowY: "auto",
//                 }}
//             >
//                 <div
//                     style={{
//                         fontWeight: "bold",
//                         fontSize: "2rem",
//                         color: "#264850",
//                         textAlign: "center",
//                         marginBottom: "20px"
//                     }}
//                 >
//                     Phiếu Mua Hàng
//                 </div>

//                 <Box sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 3
//                 }}>
//                     {/* Row 1 */}
//                     <Box sx={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(3, 1fr)", 
//                         gap: 2,
//                         '& > *': { flex: 1 } 
//                     }}>
//                         <TextBox
//                             datatype="string"
//                             title="Số phiếu mua hàng *"
//                             placeholder="Nhập số phiếu mua hàng"
//                             onChange={handleChange('purchaseNumber')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="string"
//                             title="Tên sản phẩm *"
//                             placeholder="Nhập tên sản phẩm"
//                             onChange={handleChange('productName')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="date"
//                             title="Ngày lập phiếu *"
//                             placeholder="dd/mm/yyyy"
//                             onChange={handleChange('purchaseDate')}
//                             icon={<CalendarMonthIcon style={{ color: "black" }} />}
//                             defaultValue=""
//                         />
//                     </Box>

//                     {/* Row 2 */}
//                     <Box sx={{ 
//                         display: "grid", 
//                         gridTemplateColumns: "repeat(3, 1fr)", 
//                         gap: 2,
//                         '& > *': { flex: 1 } 
//                     }}>
//                         <TextBox
//                             datatype="string"
//                             title="Loại sản phẩm *"
//                             placeholder="Nhập loại sản phẩm"
//                             onChange={handleChange('productType')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="string"
//                             title="Họ tên khách hàng *"
//                             placeholder="Nhập họ tên khách hàng"
//                             onChange={handleChange('customerName')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="string"
//                             title="Mã khách hàng"
//                             placeholder="Nhập mã khách hàng"
//                             onChange={handleChange('customerId')}
//                             defaultValue=""
//                         />
//                     </Box>

//                     {/* Row 3 */}
//                     <Box sx={{ 
//                         display: "grid", 
//                         gridTemplateColumns: "repeat(3, 1fr)", 
//                         gap: 2,
//                         '& > *': { flex: 1 } 
//                     }}>
//                         <TextBox
//                             datatype="number"
//                             title="Số điện thoại *"
//                             placeholder="Nhập số điện thoại khách hàng"
//                             onChange={handleChange('phoneNumber')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="string"
//                             title="Chất liệu *"
//                             placeholder="Nhập chất liệu sản phẩm"
//                             onChange={handleChange('material')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="string"
//                             title="CCCD/CMND *"
//                             placeholder="Nhập CCCD khách hàng"
//                             onChange={handleChange('identityNumber')}
//                             defaultValue=""
//                         />
//                     </Box>

//                     {/* Row 4 */}
//                     <Box sx={{ 
//                         display: "grid", 
//                         gridTemplateColumns: "repeat(3, 1fr)", 
//                         gap: 2,
//                         '& > *': { flex: 1 } 
//                     }}>
//                         <TextBox
//                             datatype="number"
//                             title="Giá mua lại *"
//                             placeholder="Nhập giá mua lại"
//                             onChange={handleChange('buybackPrice')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="string"
//                             title="Tình trạng *"
//                             placeholder="Nhập tình trạng (50 - 90%)"
//                             onChange={handleChange('condition')}
//                             defaultValue=""
//                         />
//                         <TextBox
//                             datatype="string"
//                             title="Mã nhân viên *"
//                             placeholder="Nhập mã nhân viên"
//                             onChange={handleChange('employeeName')}
//                             defaultValue=""
//                         />
//                     </Box>
//                 </Box>

//                 <Box sx={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: 2,
//                     marginTop: "20px"
//                 }}>
//                     <BtnComponent
//                         btnColorType="close"
//                         btnText={"Đóng"}
//                         onClick={() => setIsModalOpen(false)}
//                     />
//                     <BtnComponent
//                         btnColorType="primary"
//                         btnText="Thêm phiếu"
//                         onClick={() => {}}
//                     />
//                 </Box>
//             </Box>
//         </Modal>
//     );
// };

// export default AddBill;
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import TextBox from "../../component/TextBox/TextBox";
import { useAuth } from "../../services/useAuth";
import { FormValues } from "./types";
// import { FormValues } from "./types";

interface AddBillProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (formValues: FormValues) => void;
}

interface Product {
    name: string;
    description: string;
    code: String;
    material: string;
    costPrice: number;
    sellingPrice: number;
    imageUrl: string[];
    loaiSanPham: string;
    quantity: number;
    weight: number;
    status: string;
    chiPhiPhatSinh: number;
    supplierId: {
        $ref: string;
        id: string;
    };
}

interface BillMua {
    totalPrice: number;
    customerName: string;
    SDT: string;
    cccd: string;
    status: number;
    dsSanPhamDaMua: {
        productId: string;
        quantity: number;
    }[];
    staffId: String|undefined;
}

export const createBill = async (formValues: FormValues, productId: string, userId: String|undefined): Promise<void> => {
    try {
        const billData: BillMua = {
            totalPrice: Number(formValues.buybackPrice),
            customerName: formValues.customerName as string,
            SDT: formValues.phoneNumber as string,
            cccd: formValues.identityNumber as string,
            status: Number(formValues.condition),
            dsSanPhamDaMua: [
                {
                    productId: productId,
                    quantity: 1
                }
            ],
            staffId: userId,  // Now user is passed in as an argument
        };
        console.log(billData);
        const response = await fetch('http://localhost:8081/billMua/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(billData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("response bill mua: ", JSON.stringify(data));
        return data;        
    } catch (error) {
        console.error('Error creating bill:', error);
        throw error;
    }
};

export const createProduct = async (formValues: FormValues): Promise<string> => {
    try {
        const productData: Product = {
            name: formValues.productName as string,
            description: String(formValues.description) ?? "Sản phẩm trang sức cao cấp",
            code: formValues.productCode as string,
            material: formValues.material as string,
            costPrice: Number(formValues.buybackPrice),
            sellingPrice: Number(formValues.buybackPrice) * 1.3, // 30% markup as example
            imageUrl: [
                "https://lili.vn/wp-content/uploads/2021/12/Bong-tai-bac-Y-S925-nu-ma-bach-kim-dinh-da-CZ-hinh-trai-tim-LILI_991582_10-400x400.jpg"
            ],
            loaiSanPham: formValues.productType as string,
            quantity: 1,
            weight: Number(formValues.weight) || 0,
            status: "available",
            chiPhiPhatSinh: 100000.0,
            supplierId: {
                $ref: "supplier",
                id: "674c4a3ba8f4ef5fecf50f2a"
            }
        };

        // const response = await axios.post('http://localhost:8081/jewelry/create', productData);
        const response = await fetch("http://localhost:8081/jewelry/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          });
          const responseData = await response.json(); // Extract the JSON data
          console.log("response product: ", responseData);
          
          // Access the product ID from the parsed JSON
          return responseData.id; 
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};




export const handleFormSubmit = async (formValues: FormValues, userId: string|undefined): Promise<void> => {
    try {
        const productId = await createProduct(formValues);
        console.log("productId :" + productId); 
        await createBill(formValues, productId, userId);
        
        return Promise.resolve();
    } catch (error) {
        console.error('Error in form submission:', error);
        return Promise.reject(error);
    }
};

const AddBill: React.FC<AddBillProps> = ({ isModalOpen, setIsModalOpen, onSubmit }) => {
    const [formValues, setFormValues] = useState<FormValues>({});
    const {user} = useAuth();

    const handleChange = (name: string) => (value: string | number) => {
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const requiredFields = [
            //'purchaseNumber',
            'productName',
            'purchaseDate',
            'productType',
            'customerName',
            'phoneNumber',
            'material',
            'identityNumber',
            'buybackPrice',
            'condition',
           // 'employeeName'
        ];

        const missingFields = requiredFields.filter(field => !formValues[field]);
        
        if (missingFields.length > 0) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            console.log(missingFields);
            return;
        }
        handleFormSubmit(formValues,user?.id);
        onSubmit(formValues);
        setFormValues({});
        setIsModalOpen(false);
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
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2,
                        '& > *': { flex: 1 } 
                    }}>
                        
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

                    <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2,
                        '& > *': { flex: 1 } 
                    }}>
                        <TextBox
                            datatype="string"
                            title="Mã sản phẩm *"
                            placeholder="Nhập mã sản phẩm"
                            onChange={handleChange('productCode')}
                            defaultValue=""
                        />
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
                        
                    </Box>
                    <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(3, 1fr)", 
                        gap: 2,
                        '& > *': { flex: 1 } 
                    }}>
                        
                        <TextBox
                            datatype="number"
                            title="Khối lượng *"
                            placeholder="Nhập khối lượng sản phẩm (gram)"
                            onChange={handleChange('weight')}
                            defaultValue=""
                        />
                        <TextBox
                            datatype="string"
                            title="Mô tả sản phẩm"
                            placeholder="Nhập mô tả sản phẩm"
                            onChange={handleChange('description')}
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
                        onClick={handleSubmit}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default AddBill;