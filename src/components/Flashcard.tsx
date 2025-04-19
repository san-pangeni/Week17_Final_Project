import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Flashcard as FlashcardType } from '../data/types';
import './flashcard.css';

interface FlashcardProps {
  cardData: FlashcardType;
  onEdit: (card: FlashcardType) => void;
  onDelete: (id: string) => void;
  showControls?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ cardData, onEdit, onDelete, showControls = true }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) {
        return;
    }
    setIsFlipped(!isFlipped);
  };

   const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onEdit(cardData);
    };

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (window.confirm(`Are you sure you want to delete the card "${cardData.term}"?`)) {
             onDelete(cardData.id);
        }
    };

  return (
    <div className="flip-card-container">
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={`Flashcard for ${cardData.term}. Click or press Enter/Space to flip.`}
        aria-pressed={isFlipped}
        onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleFlip(e as any) : null}
      >
        <div className="flip-card-front">
          <Card className="h-100">
            <Card.Header as="h5">{cardData.category || 'General'}</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title className="display-6 text-center">{cardData.term}</Card.Title>
              <Card.Text className="text-muted mt-2"><i>(Click to see definition)</i></Card.Text>
            </Card.Body>
            {showControls && (
                 <Card.Footer className="text-muted d-flex justify-content-end gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={handleEditClick} aria-label={`Edit card ${cardData.term}`}>Edit</Button>
                    <Button variant="outline-danger" size="sm" onClick={handleDeleteClick} aria-label={`Delete card ${cardData.term}`}>Delete</Button>
                 </Card.Footer>
            )}
          </Card>
        </div>

        <div className="flip-card-back">
          <Card className="h-100">
             <Card.Header as="h5">{cardData.term}</Card.Header>
             <Card.Body>
                <p className="definition"><strong>Definition:</strong><br />{cardData.definition}</p>
                {cardData.example && (
                  <p className="example mt-3"><strong>Example:</strong><br />{cardData.example}</p>
                )}
             </Card.Body>
             {showControls && (
                 <Card.Footer className="text-muted d-flex justify-content-end gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={handleEditClick} aria-label={`Edit card ${cardData.term}`}>Edit</Button>
                    <Button variant="outline-danger" size="sm" onClick={handleDeleteClick} aria-label={`Delete card ${cardData.term}`}>Delete</Button>
                 </Card.Footer>
             )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;