import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { ImagePlay } from 'lucide-react';
import React, { useState } from 'react';
import profileImage from "../../assets/constant/profile.jpg";
import './CompleteProfile.css';


interface FormState {
  avatar?: File;
  phone: string;
  gender: string;
  phoneError: string;
}

const ProfileCompletion: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    phone: '',
    gender: '',
    phoneError: ''
  });

  const validatePhone = (phone: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormState(prev => ({
      ...prev,
      phone: value,
      phoneError: value && !validatePhone(value) ? 'Số điện thoại không hợp lệ' : ''
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState.phoneError && formState.phone && formState.gender) {
      console.log('Form submitted:', formState);
    }
  };

  return (
    <Box className="profile-page">
      <Box className="profile-container">
        <Box className="left-section">
          <img src={profileImage} alt="Jewelry" className="jewelry-image" />
          {/* <Box className="quote-overlay">
            <Typography variant="body2">
              "Khám phá vẻ đẹp và sự rực rỡ của đá quý và kim cương được chúng tôi lựa chọn thủ công. Mỗi sản phẩm trong bộ sưu tập của chúng tôi đều được làm để làm nổi bật vẻ đẹp tự nhiên, làm nổi bật sự lấp lánh và tinh tế ở mỗi người đeo."
            </Typography>
          </Box> */}
        </Box>

        <Box className="right-section">
          <Box className="form-content">
            <Typography variant="h4" className="main-title">
              Hoàn thành hồ sơ
            </Typography>
            
            <Typography variant="body1" className="subtitle">
              Chỉ bạn mới có thể xem được hồ sơ của mình
            </Typography>

            <Box component="form" onSubmit={handleSubmit} className="form-fields">
              <Box className="avatar-upload-section">
                <Typography className="avatar-label">Ảnh đại diện (Tùy chọn)</Typography>
                <Box className="upload-box">
                  <ImagePlay className="upload-icon" />
                  <Typography className="upload-text">CHỌN</Typography>
                </Box>
              </Box>

              <TextField
                fullWidth
                required
                label="Số điện thoại"
                value={formState.phone}
                onChange={handlePhoneChange}
                error={!!formState.phoneError}
                helperText={formState.phoneError || ' '}
                placeholder="Nhập số điện thoại"
                className="form-field"
              />

              <FormControl fullWidth required className="form-field">
                <InputLabel>Giới tính</InputLabel>
                <Select
                  value={formState.gender}
                  onChange={(e) => setFormState(prev => ({ ...prev, gender: e.target.value }))}
                  label="Giới tính"
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="submit-button"
              >
                Hoàn thành
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCompletion;