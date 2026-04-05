import api from "./api";
import type { Note } from "../types/notes";

//Define backend response shape
type AllNotesResponse = {
  success: boolean;
  data: Note[];
};

type NoteResponse = {
  success: boolean;
  data: Note;
};

// GET NOTES
export const getNotes = async (): Promise<Note[]> => {
  const res = await api.get<AllNotesResponse>("/notes");
  return res.data.data; 
};

// CREATE NOTE
export const createNote = async (data: {
  title: string;
  content: string;
}): Promise<Note> => {
  const res = await api.post<NoteResponse>("/notes", data);
  return res.data.data;
};

// UPDATE NOTE
export const updateNote = async (
  id: string,
  data: Partial<Note>
): Promise<Note> => {
  const res = await api.put<NoteResponse>(`/notes/${id}`, data);
  return res.data.data;
};

// DELETE NOTE
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

// ARCHIVE NOTE
export const archiveNote = async (id: string): Promise<Note> => {
  const res = await api.patch<NoteResponse>(`/notes/${id}/archive`);
  return res.data.data;
};