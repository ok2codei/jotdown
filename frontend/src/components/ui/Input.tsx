type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = "", ...props }: Props) => {
  return (
    <input
      {...props}
      className={`w-full p-2 border dark:border-ui-border-dark rounded outline-none ${className}`}
    />
  );
};

export default Input;