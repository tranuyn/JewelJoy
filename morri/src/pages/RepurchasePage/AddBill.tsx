import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import TextBox from "../../component/TextBox/TextBox";
import { uploadArrayImages } from "../../services/cloudinaryService"; // Import uploadArrayImages
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

const PRODUCT_TYPE_OPTIONS = [
    { label: "Nhẫn", value: "NHAN" },
    { label: "Bông tai", value: "BONGTAI" },
    { label: "Vòng tay", value: "VONGTAY" },
];

const MATERIAL_TYPE_OPTIONS = [
    { label: "Kim cương", value: "Kim cương" },
    { label: "Vàng", value: "Vàng" },
    { label: "Bạc", value: "Bạc" },    
    { label: "Bạch kim", value: "Bạch kim" },
];

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
        console.log("bill dât a: "+billData);
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



export const createProduct = async (formValues: FormValues, imageFiles: (File | null)[]): Promise<string> => { // Accept imageFiles
    try {
        // 1. Upload Images
        const validImageFiles = imageFiles.filter(file => file !== null) as File[]; // Filter out null values
        let imageUrls: string[] = [];
        if (validImageFiles.length > 0) {
            imageUrls = await uploadArrayImages(validImageFiles); // Use uploadArrayImages here
            console.log("Uploaded Image URLs:", imageUrls);
        }

        // 2. Create Product Data (now including imageUrls)
        const productData: Product = {
            name: formValues.productName as string,
            description: String(formValues.description) ?? "Sản phẩm trang sức cao cấp",
            code: formValues.productCode as string,
            material: formValues.material as string,
            costPrice: Number(formValues.buybackPrice),
            sellingPrice: Number(formValues.buybackPrice), 
            imageUrl: imageUrls, 
            loaiSanPham: formValues.productType as string,
            quantity: 1,
            weight: Number(formValues.weight) || 0,
            status: "available",
            chiPhiPhatSinh: 100000.0,
            supplierId: {
                $ref: "supplier",
                id: "674c4a3ba8f4ef5fecf50f2a" // Assuming this is still hardcoded
            }
        };

        const response = await fetch("http://localhost:8081/jewelry/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        const responseData = await response.json();
        console.log("response product: ", responseData);
        return responseData.id;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};


export const handleFormSubmit = async (formValues: FormValues, userId: string|undefined, imageFiles: (File | null)[]): Promise<void> => { // Accept imageFiles
    try {
        const productId = await createProduct(formValues, imageFiles); // Pass imageFiles to createProduct
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

    const [previewImages, setPreviewImages] = useState<(string | null)[]>([null, null, null, null, null]); // Initialize for 5 images, you can adjust
    const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null]); // To store File objects

    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(new Error("Failed to read file"));
                }
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        imageIndex: number
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const dataUrl = await readFileAsDataURL(file);

            // Update preview images
            const newPreviewImages = [...previewImages];
            newPreviewImages[imageIndex] = dataUrl;
            setPreviewImages(newPreviewImages);

            // Update images File state
            const newImages = [...images];
            newImages[imageIndex] = file;
            setImages(newImages);
        }
    };

    const handleDeleteImage = (
        e: React.MouseEvent<HTMLButtonElement>,
        imageIndex: number
    ) => {
        e.preventDefault();

        // Clear preview
        const newPreviewImages = [...previewImages];
        newPreviewImages[imageIndex] = null;
        setPreviewImages(newPreviewImages);

        // Clear File object
        const newImages = [...images];
        newImages[imageIndex] = null;
        setImages(newImages);
    };

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
        // handleFormSubmit(formValues,user?.id);
        // onSubmit(formValues);
        // setFormValues({});
        // setIsModalOpen(false);
        handleFormSubmit(formValues, user?.id, images); // Pass 'images' here
        onSubmit(formValues);
        setFormValues({});
        setPreviewImages([null, null, null, null, null]); // Clear previews on submit
        setImages([null, null, null, null, null]); // Clear image files on submit
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
                            datatype="number"
                            title="Khối lượng *"
                            placeholder="Nhập khối lượng sản phẩm (gram)"
                            onChange={handleChange('weight')}
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
                            title="Họ tên khách hàng *"
                            placeholder="Nhập họ tên khách hàng"
                            onChange={handleChange('customerName')}
                            defaultValue=""
                        />

                        <TextBox
                            datatype="string"
                            title="CCCD/CMND *"
                            placeholder="Nhập CCCD khách hàng"
                            onChange={handleChange('identityNumber')}
                            defaultValue=""
                        />

                        <TextBox
                            datatype="number"
                            title="Số điện thoại *"
                            placeholder="Nhập số điện thoại khách hàng"
                            onChange={handleChange('phoneNumber')}
                            defaultValue=""
                        />
                        

                        {/* <TextBox
                            datatype="string"
                            title="Mã khách hàng"
                            placeholder="Nhập mã khách hàng"
                            onChange={handleChange('customerId')}
                            defaultValue=""
                        /> */}
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

                        {/* <TextBox
                            datatype="string"
                            title="Loại sản phẩm *"
                            placeholder="Nhập loại sản phẩm"
                            onChange={handleChange('productType')}
                            defaultValue=""
                        /> */}                        
                        <TextBox
                            datatype="select"
                            title="Loại sản phẩm *"
                            placeholder="Chọn loại sản phẩm"
                            value={formValues.productType || ''}
                            onChange={handleChange('productType')}
                            options={PRODUCT_TYPE_OPTIONS}
                        />
                        {/* <TextBox
                            datatype="string"
                            title="Chất liệu *"
                            placeholder="Nhập chất liệu sản phẩm"
                            onChange={handleChange('material')}
                            defaultValue=""
                        /> */}
                        <TextBox
                            datatype="select"
                            title="Chất liệu *"
                            placeholder="Chọn chất liệu"
                            value={formValues.material || ''}
                            onChange={handleChange('material')}
                            options={MATERIAL_TYPE_OPTIONS}
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
                        <TextBox
                            datatype="string"
                            title="Mô tả sản phẩm"
                            placeholder="Nhập mô tả sản phẩm"
                            onChange={handleChange('description')}
                            defaultValue=""
                        />                        
                    </Box>
                    
                </Box>
                
                <Box sx={{ mt: 3 }}> {/* Add margin top for spacing */}
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                        Hình ảnh sản phẩm
                    </div>
                    <Box className="fiveForm" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}> {/* Adjust styling as needed */}
                        {[...Array(5)].map((_, index) => (
                            <Box key={index} className="input-containerE" sx={{ width: 'calc(20% - 16px)', minWidth: '100px' }}> {/* Adjust width and spacing */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="img-inputp"
                                    onChange={(e) => handleImageChange(e, index)}
                                    style={{ display: 'block', marginBottom: '5px' }} // Basic styling, customize as needed
                                />
                                {previewImages[index] && (
                                    <Box className="img-container" sx={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            src={previewImages[index] || ""}
                                            alt={`Selected preview ${index}`}
                                            className="img-preview"
                                            style={{ width: '100%', height: 'auto', display: 'block' }} // Make image responsive in container
                                        />
                                        <Box className="delete-overlay" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 1 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <button
                                                className="delete-btn"
                                                onClick={(e) => handleDeleteImage(e, index)}
                                                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} // Basic button styling, customize
                                            >
                                                Xóa
                                            </button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ))}
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