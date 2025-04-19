// src/components/EditFlashcardModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Flashcard, UpdateFlashcardData } from '../data/types';
import LoadingSpinner from './LoadingSpinner';

interface EditFlashcardModalProps {
  show: boolean;
  handleClose: () => void;
  cardToEdit: Flashcard | null;
  onUpdateCard: (id: string, cardData: UpdateFlashcardData) => Promise<void>;
  categories: string[];
}

const EditFlashcardModal: React.FC<EditFlashcardModalProps> = ({
  show,
  handleClose,
  cardToEdit,
  onUpdateCard,
  categories
}) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);


  // Populate form when cardToEdit changes
  useEffect(() => {
    if (cardToEdit) {
      setTerm(cardToEdit.term);
      setDefinition(cardToEdit.definition);
      setExample(cardToEdit.example || '');
      setCategory(cardToEdit.category);
      setError(null); // Clear previous errors
      setIsLoading(false); // Reset loading state
      // Determine if the current category is in the list or needs the 'new' input
      setShowNewCategoryInput(!categories.includes(cardToEdit.category));
    }
  }, [cardToEdit, categories]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const value = e.target.value;
         if (e.target.tagName === 'SELECT' && value === "__new__") {
            setShowNewCategoryInput(true);
            setCategory(''); // Clear category if switching to new input
        } else {
            setShowNewCategoryInput(false);
            setCategory(value);
        }
    };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!cardToEdit || !term.trim() || !definition.trim() || !category.trim()) {
       setError('Term, Definition, and Category are required.');
      return;
    }

    setIsLoading(true);
    const updatedData: UpdateFlashcardData = {
        term,
        definition,
        example,
        category
    };

    // Only include fields that have actually changed (optional, but can be efficient)
    const changes: UpdateFlashcardData = {};
    if (term !== cardToEdit.term) changes.term = term;
    if (definition !== cardToEdit.definition) changes.definition = definition;
    if (example !== (cardToEdit.example || '')) changes.example = example;
    if (category !== cardToEdit.category) changes.category = category;

    if (Object.keys(changes).length === 0) {
        setError("No changes detected.");
        setIsLoading(false);
        return;
    }


    try {
      //await onUpdateCard(cardToEdit.id, updatedData); // Send all fields OR
      await onUpdateCard(cardToEdit.id, changes); // Send only changed fields
      handleClose(); // Close modal on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while updating.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form and close modal
  const handleModalClose = () => {
     setError(null);
     setIsLoading(false);
     // Don't reset fields here, useEffect handles it based on cardToEdit
     handleClose();
  }

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Flashcard</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {cardToEdit ? (
            <>
              <Form.Group className="mb-3" controlId="editTerm">
                <Form.Label>Term</Form.Label>
                <Form.Control
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="editDefinition">
                <Form.Label>Definition</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Form.Group>

               <Form.Group className="mb-3" controlId="editCategory">
                    <Form.Label>Category</Form.Label>
                    {!showNewCategoryInput ? (
                        <Form.Select
                            aria-label="Select Category"
                            value={category}
                            onChange={handleCategoryChange}
                            disabled={isLoading}
                            required={!showNewCategoryInput}
                        >
                            <option value="">Select a category...</option>
                            {/* Ensure the current category is an option, even if not in the initial list */}
                            { (cardToEdit && !categories.includes(cardToEdit.category)) &&
                                <option key={cardToEdit.category} value={cardToEdit.category}>{cardToEdit.category}</option>
                            }
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="__new__">-- Add New Category --</option>
                        </Form.Select>
                    ) : (
                         <div className="d-flex align-items-center">
                             <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={category}
                                onChange={handleCategoryChange}
                                required={showNewCategoryInput}
                                disabled={isLoading}
                                autoFocus
                             />
                             <Button
                                 variant="outline-secondary"
                                 size="sm"
                                 className="ms-2"
                                 onClick={() => {
                                     setShowNewCategoryInput(false);
                                     // Optionally reset to original category or first available
                                     setCategory(cardToEdit?.category || (categories.length > 0 ? categories[0] : ''));
                                  }}
                                 disabled={isLoading}
                              >
                                Cancel
                             </Button>
                         </div>
                     )}
                </Form.Group>

              <Form.Group className="mb-3" controlId="editExample">
                <Form.Label>Example (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  disabled={isLoading}
                />
              </Form.Group>
            </>
          ) : (
            <LoadingSpinner /> // Show spinner if card data isn't loaded yet
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading || !cardToEdit}>
            {isLoading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditFlashcardModal;