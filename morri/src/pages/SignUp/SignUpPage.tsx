import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/constant/google-icon.png";
import loginImage from "../../assets/constant/login.jpg";
import "./SignUpPage.css";

interface RegistrationFormState {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  agreeToTerms: boolean;
  nameError: string;
  emailError: string;
  passwordError: string;
  termsError: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [formState, setFormState] = useState<RegistrationFormState>({
    name: "",
    email: "",
    password: "",
    showPassword: false,
    agreeToTerms: false,
    nameError: "",
    emailError: "",
    passwordError: "",
    termsError: "",
    gender: "FEMALE", // Default value
  });

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange =
    (prop: keyof RegistrationFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        prop === "agreeToTerms" ? event.target.checked : event.target.value;

      setFormState((prev) => ({
        ...prev,
        [prop]: value,
        ...(prop === "email" && value && {
          emailError: !validateEmail(value as string) ? "Email không hợp lệ" : "",
        }),
        ...(prop === "password" && value && {
          passwordError:
            (value as string).length < 8
              ? "Mật khẩu phải có ít nhất 8 ký tự"
              : "",
        }),
      }));
    };

  const handleClickShowPassword = () => {
    setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;
    const newErrors = {
      nameError: "",
      emailError: "",
      passwordError: "",
      termsError: "",
    };

    if (!formState.name) {
      newErrors.nameError = "Vui lòng nhập tên";
      hasError = true;
    }

    if (!formState.email || !validateEmail(formState.email)) {
      newErrors.emailError = "Email không hợp lệ";
      hasError = true;
    }

    if (!formState.password || formState.password.length < 8) {
      newErrors.passwordError = "Mật khẩu phải có ít nhất 8 ký tự";
      hasError = true;
    }

    if (!formState.agreeToTerms) {
      newErrors.termsError = "Vui lòng đồng ý với điều khoản và chính sách";
      hasError = true;
    }

    setFormState((prev) => ({
      ...prev,
      ...newErrors,
    }));

    if (!hasError) {
      try {
        // Create customer account
        const response = await axios.post('http://localhost:8081/customer/create', {
          name: formState.name,
          gioiTinh: formState.gender,
          email: formState.email,
          password: formState.password
        });

        if (response.data) {
          // Auto login after successful registration
          try {
            // await login({
            //   email: formState.email,
            //   password: formState.password,
            // });

            setSnackbar({
              open: true,
              message: "Đăng ký thành công!",
              severity: "success",
            });

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } catch (loginError) {
            console.error("Auto login failed:", loginError);
            navigate("/login");
          }
        }
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Đăng ký không thành công. Vui lòng thử lại!",
          severity: "error",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Vui lòng kiểm tra lại thông tin!",
        severity: "warning",
      });
    }
  };

  return (
    <Box className="login-page">
      <Box className="login-container">
        <Box className="image-section">
          <img src={loginImage} alt="Đăng ký" className="side-image" />
        </Box>

        <Box className="form-section">
          <Box className="form-container">
            <Typography variant="h4" className="login-title">
              <strong>Đăng ký</strong>
            </Typography>

            <Box component="form" onSubmit={handleSubmit} className="login-form">
              <Box className="input-wrapper">
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  value={formState.name}
                  onChange={handleChange("name")}
                  error={!!formState.nameError}
                  helperText={formState.nameError}
                  margin="normal"
                />
              </Box>

              <Box className="input-wrapper">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  placeholder="Nhập email"
                  value={formState.email}
                  onChange={handleChange("email")}
                  error={!!formState.emailError}
                  helperText={formState.emailError}
                  margin="dense"
                />
              </Box>

              <Box className="input-wrapper">
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  type={formState.showPassword ? "text" : "password"}
                  value={formState.password}
                  onChange={handleChange("password")}
                  error={!!formState.passwordError}
                  helperText={formState.passwordError}
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="Hiển thị mật khẩu"
                      >
                        {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Box>

              <Box className="terms-wrapper">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.agreeToTerms}
                      onChange={handleChange("agreeToTerms")}
                      color="primary"
                    />
                  }
                  label="Đồng ý với các điều khoản và chính sách bảo mật"
                />
                {formState.termsError && (
                  <FormHelperText error className="error-message terms-error">
                    {formState.termsError}
                  </FormHelperText>
                )}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
              >
                Đăng ký
              </Button>

              <Divider className="divider" sx={{ marginY: 2 }}>
                hoặc
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <img
                    src={googleIcon}
                    alt="Google Icon"
                    className="google-icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                }
                className="google-button"
              >
                Đăng ký bằng Google
              </Button>

              <Typography
                variant="body2"
                align="center"
                className="switch-auth"
                style={{ padding: "10px" }}
              >
                Đã có tài khoản?{" "}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Registration;