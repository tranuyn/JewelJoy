import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/constant/login.jpg";
import { useAuth } from "../../services/useAuth";
import "./Forgotpassword.css";

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  emailError: string;
  passwordError: string;
}

const ForgotPassword: React.FC = () => {
  const { login, logout, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
    emailError: "",
    passwordError: "",
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange =
    (prop: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormState((prev) => ({
        ...prev,
        [prop]: value,
        ...(prop === "email" && {
          emailError:
            value && !validateEmail(value) ? "Email không hợp lệ" : " ",
        }),
        ...(prop === "password" && {
          passwordError:
            value && value.length < 6 ? "Mật khẩu phải có ít nhất 6 ký tự" : " ",
        }),
      }));
    };

  const handleClickShowPassword = () => {
    setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, rememberMe: event.target.checked }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailError = !validateEmail(formState.email)
      ? "Email không hợp lệ"
      : "";
    const passwordError =
      formState.password.length < 6 ? "Mật khẩu phải có ít nhất 6 ký tự" : "";

    setFormState((prev) => ({
      ...prev,
      emailError,
      passwordError,
    }));

    if (!emailError && !passwordError) {
      try {
        await login(formState.email, formState.password);
        if (formState.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }
        if (error) return;
        navigate("/home");
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  };
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/home");
  //   } else {
  //     handleLogout();
  //   }
  // });

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
              //className="login-title"
              className="login-title forgot-title"
              style={{ fontWeight: 1700 }}
            >
              <strong>Quên mật khẩu</strong>
            </Typography>

            <Box component="form" onSubmit={handleSubmit} className="login-form">
              <Box className="form-field-container">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  placeholder="Nhập email"
                  variant="outlined"
                  value={formState.email}
                  onChange={handleChange("email")}
                  error={!!formState.emailError.trim()}
                  helperText={formState.emailError|| " "}
                  className="form-field"
                  InputProps={{
                    style: { minHeight: '40px' }
                  }}
                  FormHelperTextProps={{
                    style: { minHeight: '20px' }
                  }}
                />
                
                <Typography 
                  variant="body2" 
                  className="helper-text"
                  style={{ 
                    marginTop: '0px',
                    marginBottom: '16px',
                    color: '#666'
                  }}
                >
                  Vui lòng kiểm tra email sau khi nhấn gửi
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
              >
                {loading ? "Đang gửi thông tin" : "Gửi"}
              </Button>
              
              {error && (
                <p style={{ color: "red" }}>Email bạn nhập chưa đúng!</p>
              )}
              
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
