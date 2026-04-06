import { useNotes } from "../../hooks/useNote";
import NoteList from "../../components/notes/NoteList";
import NoteEditor from "../../components/notes/NoteEditor";
import Button from "../../components/ui/Button";

const Notes = () => {
  const {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
  } = useNotes();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 border-r bg-white p-4 flex flex-col">
        <Button onClick={createNote} className="w-full mb-4">
          + New Note
        </Button>

        <div className="flex-1 overflow-y-auto">
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