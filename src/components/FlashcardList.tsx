import React from 'react';
import { Flashcard as FlashcardType } from '../data';
import Flashcard from './Flashcard';

interface FlashcardListProps {
  flashcards: FlashcardType[];
  onEdit: (card: FlashcardType) => void;
  onDelete: (id: number) => void;
}

const FlashcardList: React.FC<FlashcardListProps> = ({ 
  flashcards, 
  onEdit, 
  onDelete 
}) => {
  // Sort flashcards by category then by term
  const sortedFlashcards = [...flashcards].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.term.localeCompare(b.term);
  });
  
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
      {sortedFlashcards.map((flashcard) => (
        <div className="col" key={flashcard.id}>
          <Flashcard 
            flashcard={flashcard} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;