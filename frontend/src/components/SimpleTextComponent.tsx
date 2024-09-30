import React from "react";

interface SimpleTextProps {
  message: string | null;
  styles?: string;
}

const SimpleText: React.FC<SimpleTextProps> = ({ message, styles }) => {
  if (!message) return null;

  return <p className={`${styles ?? "text-gray-600 text-base"}`}>{message}</p>;
};

export default SimpleText;
