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
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {flashcards.map((flashcard) => (
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