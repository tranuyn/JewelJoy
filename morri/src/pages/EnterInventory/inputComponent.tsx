import React, { ChangeEvent } from "react";

interface InputProps {
  title: string;
  name: string;
  placehoder?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputCpn: React.FC<InputProps> = ({
  title,
  name,
  placehoder = title.toLowerCase(),
  type = "text",
  value,
  onChange,
  maxLength,
  pattern,
  required = false,
  disabled = false,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "tel") {
      // Chỉ cho phép nhập số
      const value = e.target.value.replace(/[^\d]/g, "");
      e.target.value = value;
    }
    onChange?.(e);
  };

  return (
    <div className="input-containerE">
      <label className="input-labelE" htmlFor={name}>
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        className="input-fieldE"
        type={type}
        placeholder={`Nhập ${placehoder}`}
        value={value}
        onChange={handleInput}
        maxLength={maxLength}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default InputCpn;
