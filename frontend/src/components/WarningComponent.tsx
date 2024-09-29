import React from "react";

interface WarningProps {
  message: string | null;
  styles?: string;
}

const Warning: React.FC<WarningProps> = ({ message, styles }) => {
  if (!message) return null;

  return <p className={`${styles ?? "text-red-600 text-base"}`}>{message}</p>;
};

export default Warning;
