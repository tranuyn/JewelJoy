import { RootState } from "../redux/store";
import { login, logout, validateAuth } from "../redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error, token } = useAppSelector(
    (state: RootState) => state.auth
  );

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    return await dispatch(login(credentials)).unwrap();
  };

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const validateAuthStatus = useCallback(() => {
    dispatch(validateAuth());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    token,
    login: loginUser,
    logout: logoutUser,
    validateAuthStatus,
  };
};
