import React, { useState, ChangeEvent, useEffect } from "react";
import { Box } from "@mui/material";
import TextBox from "../../component/TextBox/TextBox";
import BtnComponent from "../../component/BtnComponent/BtnComponent";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WorkIcon from '@mui/icons-material/Work';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardIcon from '@mui/icons-material/CardMembership';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import Header from "../../component/Title_header/Header";
import "./setting.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import { uploadImages } from "../../services/cloudinaryService";


interface UserData {
  id: string | number ;
  username: string | number ;
  email: string | number;
  name: string | number;
  dateOfBirth: string | number;
  gender: string | number;
  phoneNumber: string | number;
  cccd: string | number;
  avaURL: string | number;
  address: string | number;
  ngayVaoLam: string | number;
  role: string | number;
}

interface PasswordUpdate {
  // oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SettingPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordData, setPasswordData] = useState<PasswordUpdate>({
    // oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({
    // oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  // const { userId } = useParams<{ userId: string }>();
  const {user}=useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
      const loggedInUserId = user?.id;
      const response = await fetch(`http://localhost:8081/user/${loggedInUserId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
      setSelectedImage(data.avaURL);
    } catch (error) {
      console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  console.log("user", userData);

//   const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
//   const file = event.target.files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result as string;
//       setSelectedImage(base64Image);
      
//       // Cập nhật userData với URL ảnh mới
//       if (userData) {
//         try {
//           const response = await fetch(`http://localhost:8081/user/${userData.id}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               ...userData,
//               avaURL: base64Image,
//               dateOfBirth: new Date(userData.dateOfBirth).toISOString(),
//               ngayVaoLam: userData.ngayVaoLam ? new Date(userData.ngayVaoLam).toISOString() : null,
//             }),
//           });

//           if (!response.ok) {
//             throw new Error('Failed to update user data');
//           }

//           setUserData(prev => prev ? { ...prev, avaURL: base64Image } : null);
//           alert('Cập nhật ảnh đại diện thành công!');
//         } catch (error) {
//           console.error("Error updating avatar:", error);
//           alert('Có lỗi xảy ra khi cập nhật ảnh đại diện!');
//         }
//       }
//     };
//     reader.readAsDataURL(file);
//   }
// };
const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary using existing service
      const cloudUrl = await uploadImages(file);
      
      if (!cloudUrl) {
        throw new Error('Upload failed');
      }

      // Update user data with new image URL
      if (userData) {
        const userUpdateResponse = await fetch(`http://localhost:8081/user/${userData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userData,
            avaURL: cloudUrl,
            dateOfBirth: new Date(userData.dateOfBirth).toISOString(),
            ngayVaoLam: userData.ngayVaoLam ? new Date(userData.ngayVaoLam).toISOString() : null,
          }),
        });

        if (!userUpdateResponse.ok) {
          throw new Error('Failed to update user data');
        }

        setUserData(prev => prev ? { ...prev, avaURL: cloudUrl } : null);
        alert('Cập nhật ảnh đại diện thành công!');
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert('Có lỗi xảy ra khi cập nhật ảnh đại diện!');
    }
  }
};


  const handlePasswordChange = (field: keyof PasswordUpdate) => (value: string | number) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value.toString()
    }));
  };

  const formatDate = (date: string | number | null) => {
    if (!date) return "";
    const dateString = typeof date === "number" ? new Date(date).toISOString() : date;
    return dateString.split('T')[0];
  };

  const roleOptions = [
    { label: "Admin", value: "ADMIN" },
    { label: "Nhân viên kho", value: "INVENTORY_STAFF" },
    { label: "Nhân viên bán hàng", value: "SALE_STAFF" },
  ];
  const handleSave = async () => {
    if (!userData) return;
    setIsLoading(true);
    
    try {
      if (passwordData.newPassword || passwordData.confirmPassword) {
        // Kiểm tra các trường bắt buộc
        if (!passwordData.newPassword || !passwordData.confirmPassword) {
          alert('Vui lòng nhập đầy đủ thông tin mật khẩu');
          setIsLoading(false);
          return;
        }
  
        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau không
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          setPasswordErrors(prev => ({
            ...prev,
            confirmPassword: 'Mật khẩu xác nhận không khớp'
          }));
          alert('Mật khẩu xác nhận không khớp');
          setIsLoading(false);
          return;
        }
  
        // Kiểm tra độ dài mật khẩu mới
        if (passwordData.newPassword.length < 6) {
          setPasswordErrors(prev => ({
            ...prev,
            newPassword: 'Mật khẩu mới phải có ít nhất 6 ký tự'
          }));
          alert('Mật khẩu mới phải có ít nhất 6 ký tự');
          setIsLoading(false);
          return;
        }

        // Gửi request kiểm tra và cập nhật mật khẩu
        const passwordResponse = await fetch(`http://localhost:8081/user/${userData.id}/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword: passwordData.newPassword,
          }),
        });
        // console.log("pwreturn", passwordResponse);
        // if (!passwordResponse.ok) {
        //   const errorText = await passwordResponse.text();
        //   if (errorText === "Current password is incorrect") {
        //     setPasswordErrors(prev => ({
        //       ...prev,
        //       oldPassword: 'Mật khẩu cũ không đúng'
        //     }));
        //     alert('Mật khẩu cũ không đúng');
        //     setIsLoading(false);
        //     return;
        //   }
        //   throw new Error(errorText);
        // }
  
        // Reset form mật khẩu sau khi cập nhật thành công
        setPasswordData({
          // oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordErrors({
          // oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
      const response = await fetch(`http://localhost:8081/user/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          dateOfBirth: new Date(userData.dateOfBirth).toISOString(),
          ngayVaoLam: userData.ngayVaoLam ? new Date(userData.ngayVaoLam).toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
  
      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error("Error saving data:", error);
      const errorMessage = (error as Error).message || 'Có lỗi xảy ra khi cập nhật thông tin!';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hehee">
      <Header title="User Profile" />
      <div style={{ padding: "10px" }}></div>
      <div className="setting-page">
        <Box sx={{ display: "flex", gap: "24px", marginBottom: "8px" }}>
          <Box sx={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Box sx={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              marginBottom: "30px",
              overflow: "hidden"
            }}>
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box sx={{ width: "100%", height: "100%", backgroundColor: "#E0E0E0" }} />
              )}
            </Box>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  backgroundColor: "#264850",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => document.getElementById("upload-photo")?.click()}
              >
                <PhotoCameraIcon style={{ fontSize: "20px" }} />
                Chọn ảnh
              </button>
            </label>
          </Box>

          <Box sx={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <TextBox
              datatype="string"
              title="Tên"
              placeholder="Nhập tên nhân viên"
              value={userData.name}
              onChange={(value) => setUserData({ ...userData, name: value })}
            />
            <TextBox
              datatype="string"
              title="CCCD"
              placeholder="Nhập CCCD"
              value={userData.cccd}
              onChange={(value) => setUserData({ ...userData, cccd: value })}
              icon={<CardIcon style={{ color: "black" }} />}
            />
            <TextBox
              datatype="string"
              title="Email"
              placeholder="Nhập Email"
              value={userData.email}
              onChange={(value) => setUserData({ ...userData, email: value })}
              icon={<EmailIcon style={{ color: "black" }} />}
            />
            <TextBox
              datatype="string"
              title="SDT"
              placeholder="Nhập SDT"
              value={userData.phoneNumber}
              onChange={(value) => setUserData({ ...userData, phoneNumber: value })}
              icon={<PhoneIcon style={{ color: "black" }} />}
            />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "8px" }}>
          <TextBox
            datatype="date"
            title="Ngày sinh"
            placeholder="02/11/2004"
            value={formatDate(userData.dateOfBirth)}
            onChange={(value) => setUserData({ ...userData, dateOfBirth: value })}
            icon={<CakeIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="select"
            title="Chức vụ"
            placeholder="Chọn chức vụ"
            value={userData.role}
            onChange={(value) => setUserData({ ...userData, role: value })}
            options={roleOptions}
          />
          <TextBox
            datatype="select"
            title="Giới tính"
            placeholder="Chọn giới tính"
            value={userData.gender}
            onChange={(value) => setUserData({ ...userData, gender: value })}
            options={[
              { label: "Nam", value: "MALE" },
              { label: "Nữ", value: "FEMALE" },
            ]}
            icon={<PersonIcon style={{ color: "black" }} />}
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "8px" }}>
          <TextBox
            datatype="date"
            title="Ngày vào làm"
            placeholder="02/11/2024"
            value={formatDate(userData.ngayVaoLam)}
            onChange={(value) => setUserData({ ...userData, ngayVaoLam: value })}
            icon={<WorkIcon style={{ color: "black" }} />}
          />
          <TextBox
            datatype="string"
            title="Địa chỉ"
            placeholder="Nhập địa chỉ"
            value={userData.address}
            onChange={(value) => setUserData({ ...userData, address: value })}
            icon={<LocationOnIcon style={{ color: "black" }} />}
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "8px" }}>
          {/* <TextBox
            datatype="string"
            title="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange('oldPassword')}
            icon={<KeyIcon style={{ color: "black" }} />}
          /> */}
          {/* <TextBox
            datatype="string"
            title="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            value={passwordData.newPassword}
            onChange={handlePasswordChange('newPassword')}
            icon={<KeyIcon style={{ color: "black" }} />}
          /> */}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}>
          {/* <TextBox
            datatype="string"
            title="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu mới"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange('confirmPassword')}
            icon={<KeyIcon style={{ color: "black" }} />}
          /> */}
        </Box>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: "16px", 
          marginTop: "10px",
          marginBottom: "20px",
        }}>
          <BtnComponent
            btnColorType="primary"
            btnText="Lưu"
            onClick={handleSave}
            disabled={isLoading}
          />
          <BtnComponent
            btnColorType="close"
            btnText="Đóng"
            onClick={() => {}}
          />
        </Box>
      </div>
    </div>
  );
};

export default SettingPage;