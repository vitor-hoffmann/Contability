import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  styles?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, styles }) => {
  return (
    <button
      className={`${
        styles ?? " "
      } text-white rounded-lg p-2 transition duration-300 ease-in-out `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
