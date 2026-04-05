import type { Note } from "@/types/notes";

type Props = {
  note: Note;
  isActive: boolean;
  onClick: () => void;
};

const NoteCard = ({ note, isActive, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded cursor-pointer mb-2 border ${
        isActive ? "bg-gray-300" : "bg-gray-100"
      }`}
    >
      <h4 className="font-semibold">{note.title}</h4>
      <p className="text-sm text-gray-500 truncate">
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;