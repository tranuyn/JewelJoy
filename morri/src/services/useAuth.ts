import { useEffect } from "react";
import { RootState } from "../redux/store";
import {
  login as LoginAction,
  logout as logoutAction,
} from "../redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    await dispatch(LoginAction(email, password));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
    }
  }, [isAuthenticated]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};
