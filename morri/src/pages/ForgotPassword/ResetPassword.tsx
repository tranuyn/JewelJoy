import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const ResetPasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        // Kiểm tra mật khẩu
        if (!newPassword || !confirmPassword) {
            setErrorMessage('Please fill in both fields.');
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (!isValidPassword(newPassword)) {
            setErrorMessage('Password must be at least 6 characters long and contain a mix of letters and numbers.');
            setLoading(false);
            return;
        }

        try {
            // Giả lập cuộc gọi API
            await fakeApiCall(newPassword);
            setSuccessMessage('Your password has been reset successfully.');
        } catch (err) {
            setErrorMessage('Failed to reset the password. Please try again.');
        } finally {
            setLoading(false);
        }

        // Reset các trường nhập
        setNewPassword('');
        setConfirmPassword('');
    };

    // Hàm giả lập cuộc gọi API
    const fakeApiCall = (password: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password.length >= 6) {
                    resolve();
                } else {
                    reject(new Error('Password too short'));
                }
            }, 2000); // Giả lập độ trễ 2 giây
        });
    };

    // Kiểm tra tính hợp lệ của mật khẩu
    const isValidPassword = (password: string): boolean => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" align="center">
                Reset Password
            </Typography>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title={showConfirmPassword ? 'Hide password' : 'Show password'}>
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                />
                <Box textAlign="center" mb={2}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                    </Button>
                </Box>
            </form>
            <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                    Remember your password?{' '}
                    <Button href="/login" variant="text">
                        Login
                    </Button>
                </Typography>
            </Box>
        </Container>
    );
};

export default ResetPasswordPage;