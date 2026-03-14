// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', ya 'outline'
  className = '', 
  icon,
  ...props 
}) => {
  // Common styles jo har button pe apply honge
  const baseStyle = "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm";
  
  // Alag-alag variants ke styles
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;