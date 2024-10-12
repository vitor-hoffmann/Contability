import React from "react";

interface TitleProps {
  text: string | null;
  styles?: string;
  onClick?: () => void;
}

const Title: React.FC<TitleProps> = ({ text, styles, onClick }) => {
  return (
    <h1
      className={`${styles ?? " "} text-blue-950 text-4xl font-bold `}
      onClick={onClick}
    >
      {text}
    </h1>
  );
};

export default Title;
