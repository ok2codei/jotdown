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
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <aside className="w-1/4 border-r p-4">
        <Button onClick={createNote} className="w-full mb-4">
          + New Note
        </Button>

        <NoteList
          notes={notes.filter(n => !n.isArchived)}
          activeId={activeNoteId}
          onSelect={setActiveNoteId}
        />
      </aside>

      {/* Editor */}
      <main className="flex-1 p-6">
        <NoteEditor note={activeNote} onChange={updateNote} />

        {activeNote && (
          <div className="mt-4 flex gap-2">
            <Button
              variant="danger"
              onClick={() => deleteNote(activeNote.id)}
            >
              Delete
            </Button>

            <Button
              variant="secondary"
              onClick={() => archiveNote(activeNote.id)}
            >
              Archive
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notes;