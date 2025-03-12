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
    category: initialValues?.category || (categories.length > 0 ? categories[0] : ''),
    ...(initialValues?.id ? { id: initialValues.id } : {})
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent submission if required fields are empty
    if (!formData.term.trim() || !formData.definition.trim()) {
      alert('Term and Definition are required.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h3>{initialValues ? 'Edit Flashcard' : 'Add New Flashcard'}</h3>
      <div className="mb-3">
        <label className="form-label">Term <span className="text-danger">*</span></label>
        <input
          type="text"
          className="form-control"
          value={formData.term}
          onChange={handleChange('term')}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Definition <span className="text-danger">*</span></label>
        <textarea
          className="form-control"
          value={formData.definition}
          onChange={handleChange('definition')}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Example</label>
        <textarea
          className="form-control"
          value={formData.example}
          onChange={handleChange('example')}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={formData.category}
          onChange={handleChange('category')}
          disabled={categories.length === 0}
        >
          {categories.length === 0 ? (
            <option value="">No categories available</option>
          ) : (
            categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))
          )}
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