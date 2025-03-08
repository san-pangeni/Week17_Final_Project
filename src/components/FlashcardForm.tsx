import { useState } from 'react';
import { Flashcard as FlashcardType } from '../data';

interface FlashcardFormProps {
  onSubmit: (card: Omit<FlashcardType, 'id'> | FlashcardType) => void;
  initialValues?: FlashcardType;
  categories: string[];
  onCancel: () => void;
}

const FlashcardForm = ({ onSubmit, initialValues, categories, onCancel }: FlashcardFormProps) => {
  const [formData, setFormData] = useState({
    term: initialValues?.term || '',
    definition: initialValues?.definition || '',
    example: initialValues?.example || '',
    category: initialValues?.category || categories[0],
    ...(initialValues?.id ? { id: initialValues.id } : {})
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h3>{initialValues ? 'Edit' : 'Add'} Flashcard</h3>
      <div className="mb-3">
        <label className="form-label">Term</label>
        <input
          type="text"
          className="form-control"
          value={formData.term}
          onChange={e => setFormData({ ...formData, term: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Definition</label>
        <textarea
          className="form-control"
          value={formData.definition}
          onChange={e => setFormData({ ...formData, definition: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Example</label>
        <textarea
          className="form-control"
          value={formData.example}
          onChange={e => setFormData({ ...formData, example: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {initialValues ? 'Update' : 'Add'} Flashcard
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FlashcardForm;