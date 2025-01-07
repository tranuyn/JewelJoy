import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loginImage from "../../assets/constant/login.jpg";
// import "./Forgotpassword.css";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewPassword(value);
    if (value && !validatePassword(value)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if (value !== newPassword) {
      setConfirmPasswordError("Mật khẩu không khớp");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validatePassword(newPassword)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu không khớp");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // const result = await authService.resetPassword(token!, newPassword);
      const result = await axios.post(`http://localhost:8081/auth/reset-password?token=${token}`, {
        
        newPassword
      });
      setSuccessMessage("Mật khẩu đã được đặt lại thành công. Đang chuyển hướng đến trang đăng nhập...");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi đặt lại mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-page">
      <Box className="login-container">
        <Box className="image-section">
          <img src={loginImage} alt="Jewelry Model" className="side-image" />
        </Box>

        <Box className="form-section">
          <Box className="form-container">
            <Typography
              component="h1"
              variant="h4"
              className="login-title forgot-title"
              style={{ fontWeight: 1700 }}
            >
              <strong>Đặt lại mật khẩu</strong>
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              className="login-form"
            >
              <Box className="form-field-container">
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  variant="outlined"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError || " "}
                  className="form-field"
                  InputProps={{
                    style: { minHeight: "40px" },
                  }}
                  FormHelperTextProps={{
                    style: { minHeight: "20px" },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  type="password"
                  id="confirmPassword"
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu mới"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!confirmPasswordError}
                  helperText={confirmPasswordError || " "}
                  className="form-field"
                  InputProps={{
                    style: { minHeight: "40px" },
                  }}
                  FormHelperTextProps={{
                    style: { minHeight: "20px" },
                  }}
                />
              </Box>

              {successMessage && (
                <Typography style={{ color: "green", marginBottom: "16px" }}>
                  {successMessage}
                </Typography>
              )}

              {error && (
                <Typography style={{ color: "red", marginBottom: "16px" }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </Button>

              <Typography
                variant="body2"
                align="center"
                className="switch-auth"
                style={{ padding: "10px" }}
              >
                Đã nhớ mật khẩu?{" "}
                <span
                  className="switch-link login-switch"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;