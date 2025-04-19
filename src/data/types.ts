export interface Flashcard {
    id: string; // mockapi.io uses string IDs by default
    category: string;
    term: string;
    definition: string;
    example: string;
    createdAt?: string; // mockapi.io often adds this
  }
  
  // Type for data needed to create a new flashcard
  export type CreateFlashcardData = Omit<Flashcard, 'id' | 'createdAt'>;
  
  // Type for data needed to update a flashcard (all fields optional)
  export type UpdateFlashcardData = Partial<CreateFlashcardData>;
  
  // Utility function to get unique categories (can be used for filter)
  export const getUniqueCategories = (cards: Flashcard[]): string[] => {
      const categories = cards.map(card => card.category);
      return Array.from(new Set(categories)).sort();
  };