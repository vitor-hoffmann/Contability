import React from "react";

interface SimpleTextProps {
  message: string | null;
  styles?: string;
  onClick?: () => void;
}

const SimpleText: React.FC<SimpleTextProps> = ({
  message,
  styles,
  onClick,
}) => {
  if (!message) return null;

  return (
    <p onClick={onClick} className={`${styles ?? "text-gray-600 text-base "}`}>
      {message}
    </p>
  );
};

export default SimpleText;
