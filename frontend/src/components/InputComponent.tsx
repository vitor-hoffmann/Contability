import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  max?: number;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  styles,
  onBlur,
  max,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      maxLength={max}
      className={`${
        styles ?? ""
      } border p-4 outline-black outline-1 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-300 transition duration-300 ease-in-out`}
    />
  );
};

export default Input;
