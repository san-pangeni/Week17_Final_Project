import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Flashcard from './Flashcard';
import { Flashcard as FlashcardType } from '../data/types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface FlashcardListProps {
  flashcards: FlashcardType[];
  isLoading: boolean;
  error: string | null;
  onEdit: (card: FlashcardType) => void;
  onDelete: (id: string) => void;
  showControls?: boolean;
}

const FlashcardList: React.FC<FlashcardListProps> = ({
    flashcards,
    isLoading,
    error,
    onEdit,
    onDelete,
    showControls = true
}) => {

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!flashcards || flashcards.length === 0) {
    return <p className="text-center text-muted mt-4">No flashcards found. Add some!</p>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {flashcards.map((card) => (
        <Col key={card.id}>
          <Flashcard
            cardData={card}
            onEdit={onEdit}
            onDelete={onDelete}
            showControls={showControls}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FlashcardList;