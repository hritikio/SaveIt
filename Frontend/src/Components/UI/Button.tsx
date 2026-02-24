import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
  disabled?: boolean;
}

const variantStyles = {
  primary:
    "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg",
  secondary: "bg-purple-100 hover:bg-purple-200 text-purple-700",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
        ${variantStyles[props.variant]} 
        ${sizeStyles[props.size]} 
        rounded-lg font-medium transition-all duration-200
        flex items-center justify-center gap-2 w-full
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {props.startIcon && <span>{props.startIcon}</span>}
      <span>{props.text}</span>
      {props.endIcon && <span>{props.endIcon}</span>}
    </button>
  );
};
