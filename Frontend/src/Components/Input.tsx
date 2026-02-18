
interface InputProps {
  placeholder: string;
  onChange?: () => void;
  ref?:any
}

function Input({ onChange, placeholder,ref }: InputProps) {
  return (
    <div>
      <input
      ref={ref}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded-xl m-2"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
