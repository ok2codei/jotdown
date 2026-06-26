import type { Note } from "@/types/notes";

type Props = {
  note: Note;
  isActive: boolean;
  onClick: () => void;
  draggable: boolean;
  onDragStart:()=> void;
  onDragOver :(e: React.DragEvent) => void;
  onDrop : ()=> void;
};

const NoteCard = ({ note, isActive, onClick, draggable, onDragStart, onDragOver, onDrop  }: Props) => {
  return (
    <div
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`p-3 rounded cursor-move mb-2 border dark:border-ui-border-dark dark:bg-ui-canvas-dark ${
        isActive ? "bg-gray-300 dark:bg-ui-surface-dark": "bg-gray-100"
      }`}
    >
      <h4 className="font-semibold dark:text-white">{note.title}</h4>
      <p className="text-sm text-gray-500 truncate">
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;