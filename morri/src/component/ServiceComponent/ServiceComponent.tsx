import React from 'react';
import { PenLine } from 'lucide-react';
import './serviceComponent.css';

interface ServiceProps {
    serviceName: string;
    serviceCode: string;
    description: string;
    price: string;
    imageUrl?: string;
    onEdit?: () => void;
}

const ServiceComponent = ({
    imageUrl = '/api/placeholder/80/80',
    serviceName,
    serviceCode,
    description,
    price,
    onEdit,
}: ServiceProps) => {
    return (
        <div className="service-card">
            {onEdit && (
                <button 
                    className="editservice-button"
                    onClick={onEdit}
                >
                    <PenLine className="editservice-icon" />
                </button>
            )}
            <div className="service-row"> {/* Bao phủ hình ảnh và nội dung */}
                <div className="service-image-container">
                    <img
                        src={imageUrl}
                        alt={serviceName}
                        className="service-image"
                    />
                </div>
                <div className="service-column"> {/* Bao phủ nội dung, hiển thị dọc */}
                    <h3 className="service-name">{serviceName}</h3>
                    <div className="service-code">Mã dịch vụ: {serviceCode}</div>
                    <div className="service-description">{description}</div>
                    <div className="service-price">
    Đơn giá: {Number(price).toLocaleString('vi-VN')} VND
</div>
                </div>
            </div>
        </div>
    );
};

export default ServiceComponent;
