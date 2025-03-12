import { useState, useEffect } from 'react';
import { flashcardData as initialData, categories } from './data';
import Sidebar from './components/Sidebar';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';
import { Flashcard as FlashcardType } from './data';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<FlashcardType | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardType[]>(() => {
    const saved = localStorage.getItem('flashcards');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const filteredCards = flashcards.filter(card =>
    (selectedCategory ? card.category === selectedCategory : true) &&
    (searchTerm
      ? card.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.definition.toLowerCase().includes(searchTerm.toLowerCase())
      : true)
  );

  const handleAddCard = (newCard: Omit<FlashcardType, 'id'>) => {
    const id = flashcards.length > 0
      ? Math.max(...flashcards.map(card => card.id)) + 1
      : 1;
    setFlashcards([...flashcards, { ...newCard, id }]);
    setShowForm(false);
  };

  const handleUpdateCard = (updatedCard: FlashcardType | Omit<FlashcardType, 'id'>) => {
    if ('id' in updatedCard) {
      setFlashcards(
        flashcards.map(card =>
          card.id === updatedCard.id ? updatedCard : card
        )
      );
    }
    setShowForm(false);
    setEditingCard(null);
  };

  const handleDeleteCard = (id: number) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      setFlashcards(flashcards.filter(card => card.id !== id));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12 app-header text-center">
          <h1 className="display-5">Precalculus Flashcards</h1>
          <p className="lead">Master precalculus concepts with these interactive flashcards</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="sticky-top pt-3" style={{ top: '1rem' }}>
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => {
                setEditingCard(null);
                setShowForm(true);
              }}
            >
              Add New Flashcard
            </button>
          </div>
        </div>

        <main className="col-md-9 col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0">
              {selectedCategory ? `${selectedCategory} Flashcards` : 'All Flashcards'}
            </h2>
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search flashcards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <FlashcardList
            flashcards={filteredCards}
            onEdit={(card) => {
              setEditingCard(card);
              setShowForm(true);
            }}
            onDelete={handleDeleteCard}
          />

          <div className={`modal fade ${showForm ? 'show d-block' : ''}`} tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {showForm && (
                  <FlashcardForm
                    onSubmit={editingCard ? handleUpdateCard : handleAddCard}
                    initialValues={editingCard || undefined}
                    categories={categories}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingCard(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
