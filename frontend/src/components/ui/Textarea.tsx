type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

const Textarea = ({ value, onChange, placeholder }: Props) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-[60vh] border dark:border-ui-border-dark p-2 rounded outline-none dark:bg-ui-surface-dark"
    />
  );
};

export default Textarea;