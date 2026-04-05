import api from "./api";
import type { Note } from "../types/notes";
import type { ApiResponse } from "../types/auth";


// GET NOTES
export const getNotes = async (): Promise<Note[]> => {
  const res = await api.get<ApiResponse<Note[]>>("/notes");
  return res.data.data;
};

// CREATE NOTE
export const createNote = async (data: {
  title: string;
  content: string;
}): Promise<Note> => {
  const res = await api.post<ApiResponse<Note>>("/notes", data);
  return res.data.data;
};

// UPDATE NOTE
export const updateNote = async (
  id: string,
  data: Partial<Note>
): Promise<Note> => {
  const res = await api.put<ApiResponse<Note>>(`/notes/${id}`, data);
  return res.data.data;
};

// DELETE NOTE
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

// ARCHIVE NOTE
export const archiveNote = async (id: string): Promise<Note> => {
  const res = await api.patch<ApiResponse<Note>>(`/notes/${id}/archive`);
  return res.data.data;
};