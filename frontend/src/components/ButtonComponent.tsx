import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  styles?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, styles, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${
        styles ?? " "
      } text-white rounded-lg px-4 py-2 transition duration-300 ease-in-out `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
