// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', ya 'outline'
  className = '', 
  icon,
  type = 'button', // 🔥 PRODUCTION RULE 1: Prevents accidental form submissions
  disabled = false, // 🔥 PRODUCTION RULE 2: Ready for loading/disabled states
  ...props 
}) => {
  // Common styles jo har button pe apply honge
  const baseStyle = "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
  
  // Alag-alag variants ke styles
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
  };

  // 🔥 PRODUCTION RULE 3: Defensive Check (Agar kisi ne galat variant pass kiya toh default primary lega)
  const safeVariant = variants[variant] || variants['primary'];

  // Disabled hone par UI kaisa dikhega
  const disabledStyle = disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  return (
    <button 
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${safeVariant} ${disabledStyle} ${className}`.trim()} 
      {...props}
    >
      {/* Icon agar pass kiya hai toh dikhega */}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;