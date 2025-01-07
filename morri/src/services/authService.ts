import axios from 'axios';

const API_URL = 'http://localhost:8081';  

export const authService = {
  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/sendPasswordResetEmail`, { email });
      return { success: true, message: response.data };
    } catch (error: any) {
      throw new Error(error.response?.data || 'Failed to send reset email');
    }
  },

//   resetPassword: async (token: string, newPassword: string) => {
//     try {
//       const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
//         token,
//         newPassword
//       });
//       return { success: true, message: response.data };
//     } catch (error: any) {
//       throw new Error(error.response?.data || 'Failed to reset password');
//     }
//   },

//   validateResetToken: async (token: string) => {
//     try {
//       const response = await axios.get(`${API_URL}/api/auth/validate-reset-token/${token}`);
//       return { success: true, valid: response.data };
//     } catch (error) {
//       return { success: false, valid: false };
//     }
//   }
};