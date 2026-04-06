import type { Note } from "../../types/notes";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

type Props = {
  note: Note | null;
  onChange: (note: Note) => void;
};

const NoteEditor = ({ note, onChange }: Props) => {
  if (!note) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Select a note to start editing</p>
      </div>
    );
  }

  return (
    <div>
      <Input
        value={note.title}
        onChange={(e) =>
          onChange({ ...note, title: e.target.value })
        }
        placeholder="Title"
        className="text-2xl font-bold mb-4"
      />

      <Textarea
        value={note.content}
        onChange={(e) =>
          onChange({ ...note, content: e.target.value })
        }
        placeholder="Write your note..."
      />
    </div>
  );
};

export default NoteEditor;