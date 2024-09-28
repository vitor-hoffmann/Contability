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
      } text-white size-fit bg-blue-700 rounded-lg p-3 hover:bg-blue-600 transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
