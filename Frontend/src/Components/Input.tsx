import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, placeholder, type = "text" }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          onChange={onChange}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
