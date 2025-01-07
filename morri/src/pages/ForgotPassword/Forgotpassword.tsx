import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/constant/login.jpg";
import { authService } from "../../services/authService";
import "./Forgotpassword.css";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await authService.forgotPassword(email);
    
    } catch (err: any) {
      setError(err.message || "Email bạn nhập chưa đúng!");
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
              <strong>Quên mật khẩu</strong>
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
                  id="email"
                  label="Email"
                  placeholder="Nhập email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError || " "}
                  className="form-field"
                  InputProps={{
                    style: { minHeight: "40px" },
                  }}
                  FormHelperTextProps={{
                    style: { minHeight: "20px" },
                  }}
                />

                <Typography
                  variant="body2"
                  className="helper-text"
                  style={{
                    marginTop: "0px",
                    marginBottom: "16px",
                    color: "#666",
                  }}
                >
                  Vui lòng kiểm tra email sau khi nhấn gửi
                </Typography>
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
                {loading ? "Đang gửi thông tin..." : "Gửi"}
              </Button>

              <Typography
                variant="body2"
                align="center"
                className="switch-auth"
                style={{ padding: "10px" }}
              >
                Bạn đã nhớ mật khẩu?{" "}
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

export default ForgotPassword;