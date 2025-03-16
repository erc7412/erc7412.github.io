import React from "react";

interface NpmIconProps {
  className?: string;
}

export const NpmIcon: React.FC<NpmIconProps> = ({ className }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 256 256" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <polygon fill="#FFFFFF" points="0 256 0 0 256 0 256 256"></polygon>
        <polygon fill="#000000" points="48 48 208 48 208 208 176 208 176 80 128 80 128 208 48 208"></polygon>
      </g>
    </svg>
  );
};

export default NpmIcon; 