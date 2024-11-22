// src/components/Header.tsx
import React from 'react';
import './Header.css'; // Đảm bảo bạn tạo một file CSS nếu cần

interface HeaderProps {
    title: string; // Định nghĩa kiểu cho props title
}

const Header: React.FC<HeaderProps> = ({ title }) => {
return (
    <header className="title_header">
        <strong className='title'>{title}</strong>
    </header>
);
};

export default Header;