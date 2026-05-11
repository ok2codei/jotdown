import { useNotes } from "../../hooks/useNote";
import NoteList from "../../components/notes/NoteList";
import NoteEditor from "../../components/notes/NoteEditor";
import Button from "../../components/ui/Button";
import { useState } from "react";

const Notes = () => {
  const {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
  } = useNotes();
  
  const [tag, setTag] = useState("");
  

  return (
    <div className="flex h-screen bg-ui-canvas dark:bg-ui-canvas-dark font-brand transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-1/4 border-r bg-white p-4 flex flex-col">
        <Button onClick={createNote} className="w-full mb-4">
          + New Note
        </Button>
          <div className="flex-1 overflow-y-auto">
  <input
    className="w-full p-2 border rounded mb-2"
    placeholder="Search by title or content..."
    value={tag}
    onChange={(e) => {
      setTag(e.target.value);
      fetchNotes(e.target.value); // Instant search!
    }}
  />

  {/* You can keep or remove the button now */}
  <button 
    className="text-xs text-blue-500 mb-4" 
    onClick={() => { setTag(""); fetchNotes(""); }}
  >
    Clear Search
  </button>
        
          <NoteList
            notes={notes.filter(n => !n.isArchived)}
            activeId={activeNoteId}
            onSelect={setActiveNoteId}
          />
        </div>
      </aside>



      {/* Editor & Actions Area */}
      <main className="flex-1 p-6 bg-white">
        {activeNote ? (
    /* Adding a KEY here forces a hard refresh when the ID changes */
    <div key={activeNote.id} className="max-w-3xl mx-auto">
      <NoteEditor note={activeNote} onChange={updateNote} />

      <div className="mt-8 flex gap-3 pt-6 border-t border-gray-100">
        <Button variant="secondary" onClick={() => archiveNote(activeNote.id)}>
          Archive Note
        </Button>
        <Button variant="danger" onClick={() => deleteNote(activeNote.id)}>
          Delete Note
        </Button>
      </div>
    </div>
  ) : (
    <div className="h-full flex items-center justify-center text-gray-400">
      <p>No note selected. Click "+ New Note" to begin.</p>
    </div>
  )}
      </main>
    </div>
  );
};

export default Notes;