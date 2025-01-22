import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/constant/google-icon.png";
import loginImage from "../../assets/constant/login.jpg";
import { useAuth } from "../../services/useAuth";
import "./LoginPage.css";

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  emailError: string;
  passwordError: string;
}

const Login: React.FC = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
    emailError: "",
    passwordError: "",
  });
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe") === "true";
    if (remembered) {
      setFormState((prev) => ({ ...prev, rememberMe: true }));
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const emailError = !validateEmail(formState.email)
      ? "Email không hợp lệ"
      : "";
    const passwordError = !validatePassword(formState.password)
      ? "Mật khẩu phải có ít nhất 6 ký tự"
      : "";

    setFormState((prev) => ({
      ...prev,
      emailError,
      passwordError,
    }));

    return !emailError && !passwordError;
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
            value && !validateEmail(value) ? "Email không hợp lệ" : "",
        }),
        ...(prop === "password" && {
          passwordError:
            value && !validatePassword(value)
              ? "Mật khẩu phải có ít nhất 6 ký tự"
              : "",
        }),
      }));
    };

  const handleClickShowPassword = () => {
    setFormState((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
    if (checked) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log("form state: ", formState);
      await login({
        email: formState.email,
        password: formState.password,
      });
      if (formState.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      if (error) return;
      navigate("/home");
      // Clear form
      setFormState({
        email: "",
        password: "",
        showPassword: false,
        rememberMe: false,
        emailError: "",
        passwordError: "",
      });
      // Clear error
    } catch (err) {
      console.error("Login failed:", err);
      setFormState((prev) => ({
        ...prev,
        passwordError: "Invalid email or password",
      }));
    }
  };
  return (
    <Box className="login-page">
      <Box className="login-container">
        {/* Left side - Image */}
        <Box className="image-section">
          <img src={loginImage} alt="Jewelry Model" className="side-image" />
        </Box>

        {/* Right side - Login Form */}
        <Box className="form-section">
          <Box className="form-container">
            <Typography
              component="h1"
              variant="h4"
              className="login-title"
              style={{ fontWeight: 1700 }}
            >
              <strong>Đăng nhập</strong>
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              className="login-form"
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                placeholder="Nhập email"
                variant="outlined"
                margin="normal"
                value={formState.email}
                onChange={handleChange("email")}
                error={!!formState.emailError.trim()}
                helperText={formState.emailError || " "}
                className="form-field"
                InputProps={{
                  style: { minHeight: "40px" }, // Đảm bảo chiều cao input cố định
                }}
                FormHelperTextProps={{
                  style: { minHeight: "20px" }, // Đảm bảo chiều cao error message cố định
                }}
              />

              <TextField
                required
                fullWidth
                id="password"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                type={formState.showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={formState.password}
                onChange={handleChange("password")}
                error={!!formState.passwordError.trim()}
                helperText={formState.passwordError || " "}
                className="form-field"
                InputProps={{
                  style: { minHeight: "40px" },
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {formState.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  ),
                }}
                FormHelperTextProps={{
                  style: { minHeight: "20px" },
                }}
              />

              <Box className="form-controls">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.rememberMe}
                      onChange={handleRememberMe}
                      color="primary"
                    />
                  }
                  label="Ghi nhớ tài khoản"
                />
                {/* <Button variant="text" className="forgot-password" onClick={() => navigate("/forgotpassword")}> 
                  Quên mật khẩu?
                </Button> */}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
              >
                {loading ? "Đang đăng nhập" : "Đăng nhập"}
              </Button>
              {/* {error && (
                <p style={{ color: "red" }}>Đăng nhập không thành công!</p>
              )}
              {isAuthenticated && (
                <p style={{ padding: "10px", color: "green" }}>
                  Đăng nhập thành công!
                </p>
              )} */}
              <Box className="divider-container">
                <Divider className="divider">
                  <Typography color="textSecondary">hoặc</Typography>
                </Divider>
              </Box>

              {/* <Button
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
                Đăng nhập bằng Google
              </Button> */}
              <Typography
                variant="body2"
                align="center"
                className="switch-auth"
                style={{ padding: "10px" }}
              >
                Bạn chưa có tài khoản?{" "}
                <span
                  className="switch-link login-switch"
                  onClick={() => navigate("/registeration")}
                >
                  Đăng ký
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
