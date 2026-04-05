type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger" | "secondary";
  className?: string;
};

const Button = ({ children, onClick, variant = "primary", className }: Props) => {
  const base = "px-4 py-2 rounded font-medium transition";

  const styles = {
    primary: "bg-black text-white hover:opacity-80",
    danger: "bg-red-500 text-white hover:opacity-80",
    secondary: "bg-gray-300 text-black hover:opacity-80",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;