import React from 'react';
import { PenLine } from 'lucide-react';
import './serviceComponent.css';
import DeleteIcon from "@mui/icons-material/Delete";

interface ServiceProps {
    serviceName: string;
    serviceCode: string;
    description: string;
    price: string;
    imageUrl?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ServiceComponent = ({
    imageUrl = '/api/placeholder/80/80',
    serviceName,
    serviceCode,
    description,
    price,
    onEdit,
    onDelete,
}: ServiceProps) => {
    return (
        <div className="service-card">
            <div className="editdelte-icon">
            {onEdit && (
                <button 
                    className="editservice-button"
                    onClick={onEdit}
                >
                    <PenLine className="editservice-icon" />
                </button>
            )}
            {onDelete && (
                <button 
                    className="deleteservice-button"
                    onClick={onDelete}
                >
                    <DeleteIcon className="deleteservice-icon" />
                </button>
            )}
            </div>
            <div className="service-row"> 
                <div className="service-image-container">
                    <img
                        src={imageUrl}
                        alt={serviceName}
                        className="service-image"
                    />
                </div>
                <div className="service-column"> 
                    <h3 className="service-name">{serviceName}</h3>
                    <div className="service-code"><strong>Mã dịch vụ:</strong> {serviceCode}</div>
                    <div className="service-description"><strong>Mô tả:</strong> <em>{description}</em></div>
                    <div className="service-price"><strong>Đơn giá:</strong> {Number(price).toLocaleString('vi-VN')} VND</div>
                </div>
            </div>
        </div>
    );
};

export default ServiceComponent;
