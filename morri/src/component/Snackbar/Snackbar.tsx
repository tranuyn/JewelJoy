import React, { useEffect } from "react";
import "./Snackbar.css";

interface SnackbarProps {
  snackbarSeverity: "success" | "error" | "warning" | "info";
  message: string;
  show: boolean;
  onClose: () => void;
  autoHideDuration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  snackbarSeverity,
  message,
  show,
  onClose,
  autoHideDuration = 3000,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [show, onClose, autoHideDuration]);

  const getSnackbarClass = (severity: string) => {
    switch (severity) {
      case "success":
        return "snackbar-success";
      case "error":
        return "snackbar-error";
      case "warning":
        return "snackbar-warning";
      case "info":
        return "snackbar-info";
      default:
        return "";
    }
  };

  return (
    <div
      className={`snackbar ${getSnackbarClass(snackbarSeverity)} ${
        show ? "snackbar-show" : "snackbar-hide"
      }`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
