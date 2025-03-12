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
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    setIsDeleting(true);
  };

  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    onDelete(flashcard.id);
    setIsDeleting(false);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    setIsDeleting(false);
  };

  // Different background colors based on category
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'Functions': 'bg-primary',
      'Polynomials': 'bg-success',
      'Trigonometry': 'bg-danger',
      'Logarithms': 'bg-warning',
      'Exponentials': 'bg-info',
      'Conic Sections': 'bg-secondary',
      'Sequences': 'bg-dark',
      'Vectors': 'bg-primary',
      'Matrices': 'bg-success',
      'Limits': 'bg-danger'
    };
    
    return colorMap[category] || 'bg-primary';
  };

  return (
    <div className="flip-card-container">
      <div 
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        {/* Front side */}
        <div className="flip-card-front">
          <div className="card h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className={`badge ${getCategoryColor(flashcard.category)}`}>{flashcard.category}</span>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleEdit}
                  aria-label="Edit flashcard"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDeleteClick}
                  aria-label="Delete flashcard"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className="text-muted small mb-2">Click to reveal definition</div>
              <h5 className="card-title text-center mb-0">{flashcard.term}</h5>
            </div>
            {isDeleting && (
              <div className="card-footer bg-light">
                <div className="text-center">
                  <p className="text-danger mb-2">Are you sure you want to delete this flashcard?</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-sm btn-danger" onClick={confirmDelete}>
                      Yes, Delete
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={cancelDelete}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back side */}
        <div className="flip-card-back">
          <div className="card h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className={`badge ${getCategoryColor(flashcard.category)}`}>{flashcard.category}</span>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleEdit}
                  aria-label="Edit flashcard"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDeleteClick}
                  aria-label="Delete flashcard"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="text-muted small mb-1">Term:</div>
              <h5 className="card-title mb-3">{flashcard.term}</h5>
              
              <div className="text-muted small mb-1">Definition:</div>
              <p className="card-text definition mb-3">{flashcard.definition}</p>
              
              {flashcard.example && (
                <>
                  <div className="text-muted small mb-1">Example:</div>
                  <p className="card-text example font-italic">{flashcard.example}</p>
                </>
              )}
              
              <div className="text-center mt-3">
                <small className="text-muted">Click to flip back</small>
              </div>
            </div>
            {isDeleting && (
              <div className="card-footer bg-light">
                <div className="text-center">
                  <p className="text-danger mb-2">Are you sure you want to delete this flashcard?</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-sm btn-danger" onClick={confirmDelete}>
                      Yes, Delete
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={cancelDelete}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;