import React, { ReactNode, useState } from "react";
import { TextField, Typography, MenuItem, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#666",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& input": {
    padding: "14px",
    fontSize: "16px",
  },
}));

interface Option {
  label: string;
  value: string;
}

interface TextBoxProps {
  datatype: "number" | "string" | "date" | "select";
  title: string;
  placeholder: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
  className?: string;
  icon?: ReactNode;
  options?: Option[];
  defaultValue?: string | number;
}

const TextBox: React.FC<TextBoxProps> = ({
  datatype,
  title,
  placeholder,
  value: initialValue,
  onChange,
  className = "",
  icon,
  options = [],
  defaultValue,
}) => {
  const [inputValue, setValue] = useState<string>(() => {
    if (datatype === "date" && defaultValue) {
      return new Date(defaultValue).toISOString().split("T")[0];
    }
    if (datatype === "number") {
      return initialValue?.toString() || defaultValue?.toString() || "0";
    }
    return initialValue?.toString() || defaultValue?.toString() || "";
  });

  const [error, setError] = useState<string>("");

  const handleValidateInput = (newValue: string): boolean => {
    if (newValue === "") return true;

    if (datatype === "number") {
      const isValidNumber = /^\d*$/.test(newValue);
      if (!isValidNumber) {
        setError("Please enter numbers only");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;

    if (datatype === "number" && !handleValidateInput(newValue)) {
      return;
    }

    setValue(newValue);

    if (onChange) {
      if (datatype === "number") {
        const numericValue = newValue ? parseInt(newValue, 10) : 0;
        onChange(numericValue);
      } else {
        onChange(newValue);
      }
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography
        variant="subtitle1"
        style={{
          marginBottom: "5px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        {title}
      </Typography>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {datatype === "select" ? (
          <CustomTextField
            select
            fullWidth
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            variant="outlined"
            className={className}
            sx={{
              "& .MuiFormHelperText-root": {
                color: "#d32f2f",
                marginLeft: "0",
                fontSize: "13px",
              },
            }}
            InputProps={{
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : null,
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
        ) : (
          <CustomTextField
            fullWidth
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            variant="outlined"
            className={className}
            type={datatype === "date" ? "date" : "text"}
            sx={{
              "& .MuiFormHelperText-root": {
                color: "#d32f2f",
                marginLeft: "0",
                fontSize: "13px",
              },
            }}
            InputProps={{
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : null,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TextBox;
