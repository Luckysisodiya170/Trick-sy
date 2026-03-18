import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary',
  className = '', 
  icon,
  type = 'button', 
  disabled = false,
  ...props 
}) => {
  const baseStyle = "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
  };

  const safeVariant = variants[variant] || variants['primary'];

  const disabledStyle = disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  return (
    <button 
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${safeVariant} ${disabledStyle} ${className}`.trim()} 
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;