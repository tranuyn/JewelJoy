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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/constant/google-icon.png";
import loginImage from "../../assets/constant/login.jpg";
import "./SignUpPage.css";

interface RegistrationFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean;
  agreeToTerms: boolean;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  passwordError: string;
  termsError: string;
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    agreeToTerms: false,
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    termsError: "",
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
        ...(prop === "email" && value &&{
          emailError: !validateEmail(value as string) ? "Email không hợp lệ" : " ",
        }),
        ...(prop === "password" && value &&{
          passwordError:
            (value as string).length < 6
              ? "Mật khẩu phải có ít nhất 6 ký tự"
              : " ",
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
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      termsError: "",
    };

    if (!formState.firstName) {
      newErrors.firstNameError = "Vui lòng nhập tên";
      hasError = true;
    }

    if (!formState.lastName) {
      newErrors.lastNameError = "Vui lòng nhập họ";
      hasError = true;
    }

    // if (!formState.email || !validateEmail(formState.email)) {
    //   newErrors.emailError = "Email không hợp lệ";
    //   hasError = true;
    // }

    // if (!formState.password || formState.password.length < 6) {
    //   newErrors.passwordError = "Mật khẩu phải có ít nhất 6 ký tự";
    //   hasError = true;
    // }

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
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập gọi API
        setSnackbar({
          open: true,
          message: "Đăng ký thành công!",
          severity: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Đăng ký không thành công. Vui lòng thử lại!",
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
        {/* Phần hình ảnh */}
        <Box className="image-section">
          <img src={loginImage} alt="Đăng ký" className="side-image" />
        </Box>

        {/* Phần biểu mẫu */}
        <Box className="form-section">
          <Box className="form-container">
            <Typography variant="h4" className="login-title">
              <strong>Đăng ký</strong>
            </Typography>

            <Box component="form" onSubmit={handleSubmit} className="login-form">
              <Box className="name-fields">
                <Box className = "input-wrapper">
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Họ"
                  placeholder="Nhập họ"
                  value={formState.lastName}
                  onChange={handleChange("lastName")}
                  error={!!formState.lastNameError}
                  helperText={formState.lastNameError}
                  margin="normal"
                />
                
                </Box>
                <Box className = "input-wrapper">
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="Tên"
                  placeholder="Nhập tên"
                  value={formState.firstName}
                  onChange={handleChange("firstName")}
                  error={!!formState.firstNameError}
                  helperText={formState.firstNameError}
                  margin="normal"
                />
                
              </Box>
              </Box>

              <Box className = "input-wrapper">
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                placeholder="Nhập email"
                value={formState.email}
                onChange={handleChange("email")}
                error={!!formState.emailError}
               // helperText={formState.emailError}
                margin="dense"
              />
              {formState.emailError && (
                  <FormHelperText error className="error-message">
                    {formState.emailError}
                  </FormHelperText>
              )}
              </Box>

              <Box className = "input-wrapper">
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
                //helperText={formState.passwordError}
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
              {formState.passwordError && (
                  <FormHelperText error className="error-message">
                    {formState.passwordError}
                  </FormHelperText>
                )}
              </Box>

              <Box className = "terms-wrapper">
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
              {/* {formState.termsError && (
                <Typography color="error" variant="caption">
                  {formState.termsError}
                </Typography>
              )} */}

              <Button type="submit" fullWidth variant="contained" className="login-button">
                Đăng ký
              </Button>

              <Divider className="divider" sx={{ marginY: 2 }}>hoặc</Divider>

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

              <Typography variant="body2" align="center" className="switch-auth" style = {{padding: "10px"}}>
                Đã có tài khoản?{" "}
                <span className="switch-link login-switch" onClick={() => navigate("/login")}>
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
