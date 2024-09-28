import React from "react";

interface TitleProps {
  text: string;
  styles?: string;
}

const Title: React.FC<TitleProps> = ({ text, styles }) => {
  return (
    <h1 className={`${styles ?? ""} text-blue-950 text-4xl font-bold `}>
      {text}
    </h1>
  );
};

export default Title;
