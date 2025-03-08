interface SidebarProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
  }
  
  const Sidebar = ({ categories, selectedCategory, onSelectCategory }: SidebarProps) => {
    return (
      <div className="list-group">
        <button 
          className={`list-group-item list-group-item-action ${selectedCategory === null ? 'active' : ''}`} 
          onClick={() => onSelectCategory(null)}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button 
            key={category} 
            className={`list-group-item list-group-item-action ${selectedCategory === category ? 'active' : ''}`} 
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default Sidebar;