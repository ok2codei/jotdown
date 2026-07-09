import { useNotes } from "../../hooks/useNote";
import NoteList from "../../components/notes/NoteList";
import NoteEditor from "../../components/notes/NoteEditor";
import Button from "../../components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "../../hooks/useAuth";
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
    reorderNotes,
  } = useNotes();
  
  const [tag, setTag] = useState("");
  const { user } = useAuth();
  
  
  const username = user?.name;
  

  return (
  <div className=" flex gap-6 h-full">
        <div className="flex flex-col  mb-8">
        <h1 className="m-6 text-2xl font-bold">
         {"Welcome, "} {username}
        </h1>
     
        {/* Sidebar */}
        <aside className="w-80 rounded-2xl bg-ui-surface dark:bg-ui-surface-dark p-4 flex flex-col border border-ui-border dark:border-ui-border-dark"> 
          <Button onClick={createNote} className="w-full mb-4">
          + New Note
        </Button>
          <div className="flex-1 overflow-y-auto">
        <input
        className="w-full px-4 py-2 rounded-xl border border-ui-border dark:border-ui-border-dark bg-transparent outline-none focus:ring-2 focus:ring-brand-primary mb-3"
        placeholder="Search by title or content..."
        value={tag}
        onChange={(e) => {
          setTag(e.target.value);
          fetchNotes(e.target.value); // Instant search!
        }}
         />

  <h2 className="text-lg font-semibold mb-4">
  Notes
  </h2>

  {/* You can keep or remove the button now */}
  <button 
    className="text-sm text-brand-primary mb-4 hover:underline"
    onClick={() => { setTag(""); fetchNotes(""); }}
  >
    Clear Search
  </button>
        
          <NoteList
            notes={notes.filter(n => !n.isArchived)}
            activeId={activeNoteId}
            onSelect={setActiveNoteId}
            onReorder={reorderNotes}
          />
        </div>
      </aside>
 </div>


      {/* Editor & Actions Area */}
<main className="realtive flex-1 rounded-2xl bg-ui-surface dark:bg-ui-surface-dark p-6 overflow-hidden">    
   
     {activeNote ? (
    /* Adding a KEY here forces a hard refresh when the ID changes */
    <div key={activeNote.id} className="max-w-3xl mx-auto">
      <NoteEditor note={activeNote} onChange={updateNote} />

      <div className="mt-8 flex gap-3 pt-6  border-gray-100">
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
  <div className="m-4 absolute top-6 right-6 z-50">
    <ThemeToggle />
  </div>
      </main>
    </div>
  );
};

export default Notes;