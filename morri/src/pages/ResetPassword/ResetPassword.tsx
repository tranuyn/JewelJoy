import { Button, FormHelperText, IconButton, TextField, Typography } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import loginImage from "../../assets/constant/login.jpg";
import './ResetPassword.css';

// Define interfaces
interface FormState {
  newPassword: string;
  confirmPassword: string;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  newPasswordError: string;
  confirmPasswordError: string;
}

interface ResetPasswordProps {
  onSubmit?: (newPassword: string) => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<FormState>({
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false,
    newPasswordError: '',
    confirmPasswordError: ''
  });

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prev => {
      const newState = {
        ...prev,
        [name]: value,
        newPasswordError: name === 'newPassword' && value.length > 0 && value.length < 6 
          ? 'Mật khẩu mới cần có ít nhất 6 ký tự'
          : '',
        confirmPasswordError: name === 'confirmPassword' && value !== prev.newPassword
          ? 'Mật khẩu chưa giống nhau'
          : ''
      };

      if (name === 'newPassword' && prev.confirmPassword) {
        newState.confirmPasswordError = value !== prev.confirmPassword 
          ? 'Mật khẩu chưa giống nhau' 
          : '';
      }

      return newState;
    });
  };

  const togglePasswordVisibility = (field: 'showNewPassword' | 'showConfirmPassword') => {
    setFormState(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formState.newPassword.length >= 6 && formState.newPassword === formState.confirmPassword) {
      onSubmit?.(formState.newPassword);
      console.log('Password reset successful');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-wrapper">
        {/* Image Section */}
        <div className="image-section">
          <img 
            src={loginImage}
            alt="Reset Password"
            className="reset-image"
          />
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-wrapper">
            <Typography variant="h4" className="form-title">
              Đặt mật khẩu mới
            </Typography>
            
            <Typography className="form-subtitle">
              Mật khẩu mới cần có ít nhất 6 ký tự
            </Typography>

            <form onSubmit={handleSubmit} className="reset-form">
              <div className="input-wrapper">
                <TextField
                  fullWidth
                  name="newPassword"
                  label="Mật khẩu mới"
                  type={formState.showNewPassword ? 'text' : 'password'}
                  value={formState.newPassword}
                  onChange={handlePasswordChange}
                  //error={!!formState.newPasswordError}
                  //helperText={formState.newPasswordError}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('showNewPassword')}
                        edge="end"
                      >
                        {formState.showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    )
                  }}
                />
                {formState.newPasswordError && (
                  <FormHelperText error className="error-message">
                    {formState.newPasswordError}
                  </FormHelperText>
                )}
              </div>

              <div className="input-wrapper">
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Nhập lại mật khẩu"
                  type={formState.showConfirmPassword ? 'text' : 'password'}
                  value={formState.confirmPassword}
                  onChange={handlePasswordChange}
                  //error={!!formState.confirmPasswordError}
                  //helperText={formState.confirmPasswordError}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('showConfirmPassword')}
                        edge="end"
                      >
                        {formState.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    )
                  }}
                />  
                {formState.confirmPasswordError && (
                  <FormHelperText error className="error-message">
                    {formState.confirmPasswordError}
                  </FormHelperText>
                )}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="submit-button"
                disabled={!!formState.newPasswordError || !!formState.confirmPasswordError}
              >
                Đặt lại
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;