import React from 'react';
import { Form } from 'react-bootstrap';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <Form.Group controlId="categoryFilter" className="mb-3">
      <Form.Label>Filter by Category</Form.Label>
      <Form.Select
        aria-label="Filter by category"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CategoryFilter;