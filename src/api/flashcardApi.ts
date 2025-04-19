import axios from 'axios';
import { Flashcard, CreateFlashcardData, UpdateFlashcardData } from '../data/types';


const API_URL = 'https://67daeede1fd9e43fe472e50d.mockapi.io/api/flashcards/flashcards';


export const getFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const response = await axios.get<Flashcard[]>(API_URL);
    return response.data.sort((a, b) =>
        (b.createdAt && a.createdAt) ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : 0
    );
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    throw new Error('Failed to fetch flashcards.');
  }
};

export const getFlashcardById = async (id: string): Promise<Flashcard> => {
   try {
     const response = await axios.get<Flashcard>(`${API_URL}/${id}`);
     return response.data;
   } catch (error) {
     console.error(`Error fetching flashcard ${id}:`, error);
     throw new Error('Failed to fetch flashcard.');
   }
};

export const createFlashcard = async (flashcardData: CreateFlashcardData): Promise<Flashcard> => {
  try {
    const response = await axios.post<Flashcard>(API_URL, flashcardData);
    return response.data;
  } catch (error) {
     console.error("Error creating flashcard:", error);
     throw new Error('Failed to create flashcard.');
  }
};

export const updateFlashcard = async (id: string, flashcardData: UpdateFlashcardData): Promise<Flashcard> => {
  try {
    const response = await axios.put<Flashcard>(`${API_URL}/${id}`, flashcardData);
    return response.data;
   } catch (error) {
     console.error(`Error updating flashcard ${id}:`, error);
     throw new Error('Failed to update flashcard.');
  }
};

export const deleteFlashcard = async (id: string): Promise<void> => {
   try {
     await axios.delete(`${API_URL}/${id}`);
   } catch (error) {
     console.error(`Error deleting flashcard ${id}:`, error);
     throw new Error('Failed to delete flashcard.');
   }
};
