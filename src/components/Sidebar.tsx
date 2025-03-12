interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const Sidebar = ({ categories, selectedCategory, onSelectCategory }: SidebarProps) => {
  // Get count of categories to display badges (would need to pass flashcards as prop in real implementation)
  
  return (
    <div className="list-group list-group-flush">
      <button 
        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedCategory === null ? 'active fw-bold' : ''}`} 
        onClick={() => onSelectCategory(null)}
      >
        <span><i className="bi bi-grid me-2"></i>All Categories</span>
      </button>
      
      {categories.map((category) => (
        <button 
          key={category} 
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedCategory === category ? 'active fw-bold' : ''}`} 
          onClick={() => onSelectCategory(category)}
        >
          <span><i className="bi bi-tag me-2"></i>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;