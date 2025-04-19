import React, { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { CreateFlashcardData } from '../data/types';

interface AddFlashcardFormProps {
  onAddCard: (cardData: CreateFlashcardData) => Promise<void>;
  categories: string[];
}

const AddFlashcardForm: React.FC<AddFlashcardFormProps> = ({ onAddCard, categories }) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "__new__") {
            setShowNewCategoryInput(true);
            setCategory(''); 
        } else {
            setShowNewCategoryInput(false);
            setCategory(value);
        }
    };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!term.trim() || !definition.trim() || !category.trim()) {
      setError('Term, Definition, and Category are required.');
      return;
    }

    setIsLoading(true);
    try {
      await onAddCard({ term, definition, example, category });
      
      setTerm('');
      setDefinition('');
      setExample('');
      setCategory('');
      setShowNewCategoryInput(false); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h4">Add New Flashcard</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTerm">
            <Form.Label>Term</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDefinition">
            <Form.Label>Definition</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

           <Form.Group className="mb-3" controlId="formCategory">
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
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="__new__">-- Add New Category --</option>
                    </Form.Select>
                ) : (
                     <div className="d-flex align-items-center">
                         <Form.Control
                            type="text"
                            placeholder="Enter new category name"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required={showNewCategoryInput}
                            disabled={isLoading}
                            autoFocus
                         />
                         <Button
                             variant="outline-secondary"
                             size="sm"
                             className="ms-2"
                             onClick={() => { setShowNewCategoryInput(false); setCategory(''); }} 
                             disabled={isLoading}
                          >
                            Cancel
                         </Button>
                     </div>
                 )}
            </Form.Group>

          <Form.Group className="mb-3" controlId="formExample">
            <Form.Label>Example (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter an example sentence or usage"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              disabled={isLoading}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Add Card'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddFlashcardForm;