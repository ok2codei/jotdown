import type { Note } from "../../types/notes";
import NoteCard from "./NoteCard";
import { useState } from "react";

type Props = {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onReorder: (notes:Note[])=> void;
};

const NoteList = ({ notes, activeId, onSelect, onReorder }: Props) => {
  
  const[draggedId, setDraggedId]= useState<string | null>(null);

  const handleDrop =(targetId: string)=>{
    if(!draggedId) return;
    const draggedIndex= notes.findIndex(n => n.id === draggedId);
    
    const targetIndex= notes.findIndex( n=> n.id === targetId);

    if( draggedIndex === -1 || targetIndex === -1) return;
    const updated = [...notes];
    const [draggedNote]=updated.splice(draggedIndex, 1);

    updated.splice(
      targetIndex,
      0,
      draggedNote
    );
    onReorder(updated);
    setDraggedId(null);
  };

  return (
    <div>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          draggable
          onDragStart={()=>
            setDraggedId(note.id)
          }
          onDragOver ={ (e)=>{
            e.preventDefault()
          }}
          onDrop={()=>{
            handleDrop(note.id)
          }}

          note={note}
          isActive={note.id === activeId}
          onClick={() => onSelect(note.id)}
        />
      ))}
    </div>
  );
};

export default NoteList;