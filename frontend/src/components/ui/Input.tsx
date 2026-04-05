type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const Input = ({ value, onChange, placeholder, className }: Props) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded outline-none ${className}`}
    />
  );
};

export default Input;