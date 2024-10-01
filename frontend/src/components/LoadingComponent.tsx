import React from "react";

type LoadingSpinnerProps = {
  size?: number;
  color?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 8,
  color = "border-blue-500",
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-${size} h-${size} border-4 border-t-transparent rounded-full animate-spin ${color}`}
        role="status"
      />
    </div>
  );
};

export default LoadingSpinner;
