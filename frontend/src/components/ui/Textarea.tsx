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
      className="w-full h-[60vh] border p-2 rounded outline-none"
    />
  );
};

export default Textarea;