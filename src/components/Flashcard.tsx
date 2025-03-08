import React, { useState } from 'react';
import { Flashcard as FlashcardType } from '../data';
import './Flashcard.css';

interface FlashcardProps {
  flashcard: FlashcardType;
  onEdit: (card: FlashcardType) => void;
  onDelete: (id: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ flashcard, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.btn-group') && !target.closest('button')) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    onEdit(flashcard);
  };

  return (
    <div className="flip-card-container">
      <div 
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        {/* Front side */}
        <div className="flip-card-front">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="badge bg-primary">{flashcard.category}</span>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this flashcard?')) {
                      onDelete(flashcard.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <h5 className="card-title text-center mb-0">{flashcard.term}</h5>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div className="flip-card-back">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="badge bg-primary">{flashcard.category}</span>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this flashcard?')) {
                      onDelete(flashcard.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Definition:</h6>
              <p className="card-text">{flashcard.definition}</p>
              {flashcard.example && (
                <>
                  <h6 className="card-subtitle mb-2 text-muted">Example:</h6>
                  <p className="card-text">{flashcard.example}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;