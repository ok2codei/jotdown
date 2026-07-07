
import { useNotes } from "../../hooks/useNote";
import NoteList from "../../components/notes/NoteList";
import NoteEditor from "../../components/notes/NoteEditor";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useState } from "react";


const Archive = () => {
  const {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    fetchNotes,
    deleteNote,
    updateNote,
    restoreNote,
  } = useNotes();

  const [search, setSearch] = useState("");

  const archivedNotes = notes.filter(note => note.isArchived);

  return (
    <div className="flex h-screen bg-ui-canvas dark:bg-ui-canvas-dark">

      {/* Sidebar */}
      <aside className="w-80 rounded-2xl bg-ui-surface dark:bg-ui-surface-dark p-4 flex flex-col border border-ui-border dark:border-ui-border-dark">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Archive
          </h2>

          <Link
            to="/app/notes"
            className="text-sm text-brand-primary hover:underline"
          >
            Back
          </Link>
        </div>

        <input
          className="w-full px-4 py-2 rounded-xl border border-ui-border dark:border-ui-border-dark bg-transparent outline-none mb-4"
          placeholder="Search archived notes..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchNotes(e.target.value);
          }}
        />

        <div className="flex-1 overflow-y-auto">

          {archivedNotes.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              📦
              <p className="mt-2">
                No archived notes.
              </p>
            </div>
          ) : (
            <NoteList
              notes={archivedNotes}
              activeId={activeNoteId}
              onSelect={setActiveNoteId}
            />
          )}

        </div>

      </aside>

      {/* Editor */}
      <main className="flex-1 p-8">

        {activeNote ? (
          <div
            key={activeNote.id}
            className="max-w-3xl mx-auto"
          >
            <NoteEditor
              note={activeNote}
              onChange={updateNote}
            />

            <div className="flex gap-3 mt-8">

              <Button
                onClick={() => restoreNote(activeNote.id)}
              >
             Restore
              </Button>

              <Button
                variant="danger"
                onClick={() => deleteNote(activeNote.id)}
              >
                Delete Permanently
              </Button>

            </div>

          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Select an archived note.
          </div>
        )}

      </main>

    </div>
  );
};

export default Archive;