import type { Note } from "../../types/notes";
import NoteCard from "./NoteCard";

type Props = {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

const NoteList = ({ notes, activeId, onSelect }: Props) => {
  return (
    <div>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          isActive={note.id === activeId}
          onClick={() => onSelect(note.id)}
        />
      ))}
    </div>
  );
};

export default NoteList;