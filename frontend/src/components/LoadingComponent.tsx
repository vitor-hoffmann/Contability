import React from "react";

type LoadingSpinnerProps = {
  size?: number;
  styles?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 8,
  styles,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${
          styles ?? ""
        } w-${size} h-${size} border-4 border-t-transparent border-blue-500 rounded-full animate-spin`}
        role="status"
      />
    </div>
  );
};

export default LoadingSpinner;
