import axios from "axios";
import type { NewNote, Note } from "../types/note"; 

interface NotesResponse {
  
  notes: Note[];
  totalPages: number;
}

const notesApi = axios.create({
  
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(searchQuery: string, currentPage: number) {
  
  const response = await notesApi.get<NotesResponse>("/notes", {
    params: {
      search: searchQuery,
      page: currentPage,
      perPage: 12,
    },
  });

  return response.data; 
}

export async function createNote(noteData: NewNote) {
 
  const response = await notesApi.post<Note>("/notes", noteData);

  return response.data; 
}

export async function deleteNote(noteId: string) {
  
  const response = await notesApi.delete<Note>(`/notes/${noteId}`);

  return response.data; 
}
