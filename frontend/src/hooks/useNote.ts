import { useState, useEffect } from "react";
import type { Note } from "../types/notes";
import * as noteService from "../services/noteService";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeNote = notes.find(n => n.id === activeNoteId) || null;


  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
    if (!token) return; // 🛑 Stop if no token
      setLoading(true);
      try {
        const data = await noteService.getNotes();

        setNotes(Array.isArray(data) ? data : []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  //  CREATE (OPTIMISTIC)
  const createNote = async () => {
    const tempNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled",
      content: "",
      tags: [],
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes(prev => [tempNote, ...prev]);
    setActiveNoteId(tempNote.id);

    try {
      const saved = await noteService.createNote({
        title: tempNote.title,
        content: tempNote.content,
      });

      // replace temp with real
      setNotes(prev =>
        prev.map(n => (n.id === tempNote.id ? saved : n))
      );
    } catch (err) {
      setError((err as Error).message);

      // rollback
      setNotes(prev => prev.filter(n => n.id !== tempNote.id));
    }
  };

  // 🔹 UPDATE (OPTIMISTIC)
  const updateNote = async (updated: Note) => {
    setNotes(prev =>
      prev.map(n => (n.id === updated.id ? updated : n))
    );

    try {
      await noteService.updateNote(updated.id, updated);
    } catch (err) {
      setError((err as Error).message);
      // (optional rollback)
    }
  };

  //  DELETE
  const deleteNote = async (id: string) => {
    const prevNotes = notes;

    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);

    try {
      await noteService.deleteNote(id);
    } catch (err) {
      setError((err as Error).message);
      setNotes(prevNotes); // rollback
    }
  };

  //  ARCHIVE
  const archiveNote = async (id: string) => {
    try {
      const updated = await noteService.archiveNote(id);

      setNotes(prev =>
        prev.map(n => (n.id === id ? updated : n))
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    loading,
    error,
  };
};