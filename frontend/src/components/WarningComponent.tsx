import React from "react";

interface WarningProps {
  message: string | null;
  styles?: string;
  onClick?: () => void;
}

const Warning: React.FC<WarningProps> = ({ message, styles, onClick }) => {
  if (!message) return null;

  return (
    <p onClick={onClick} className={`${styles ?? "text-red-600 text-base"}`}>
      {message}
    </p>
  );
};

export default Warning;
