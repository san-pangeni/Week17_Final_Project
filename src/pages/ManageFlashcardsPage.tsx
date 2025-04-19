import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import AddFlashcardForm from '../components/AddFlashcardForm';
import FlashcardList from '../components/FlashcardList';
import EditFlashcardModal from '../components/EditFlashcardModal';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../api/flashcardApi';
import { Flashcard, CreateFlashcardData, UpdateFlashcardData, getUniqueCategories } from '../data/types';
import Header from '../components/Header';

const ManageFlashcardsPage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<Flashcard | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [notification, setNotification] = useState<{type: 'success' | 'danger', message: string} | null>(null);


  const loadFlashcards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setNotification(null); 
    try {
      const data = await getFlashcards();
      setFlashcards(data);
      setCategories(getUniqueCategories(data)); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flashcards.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  
   useEffect(() => {
        if (selectedCategory === '') {
            setFilteredFlashcards(flashcards);
        } else {
            setFilteredFlashcards(flashcards.filter(card => card.category === selectedCategory));
        }
    }, [selectedCategory, flashcards]);


  
  const handleAddCard = async (cardData: CreateFlashcardData) => {
    setError(null);
    setNotification(null);
    try {
      await createFlashcard(cardData);
      setNotification({ type: 'success', message: `Flashcard "${cardData.term}" added successfully!` });
      loadFlashcards(); 
    } catch (err) {
       const message = err instanceof Error ? err.message : 'Failed to add flashcard.';
       setError(message); 
       setNotification({ type: 'danger', message: message }); 
       throw err; 
    }
  };

  const handleEditCard = (card: Flashcard) => {
    setCardToEdit(card);
    setEditModalShow(true);
  };

  const handleUpdateCard = async (id: string, cardData: UpdateFlashcardData) => {
     setError(null);
     setNotification(null);
     try {
        await updateFlashcard(id, cardData);
        setNotification({ type: 'success', message: `Flashcard updated successfully!` });
        setEditModalShow(false);
        setCardToEdit(null);
        loadFlashcards(); 
     } catch (err) {
         const message = err instanceof Error ? err.message : 'Failed to update flashcard.';
         setError(message); 
         setNotification({ type: 'danger', message: message });
         throw err; 
     }
  };

  const handleDeleteCard = async (id: string) => {
    setError(null);
    setNotification(null);
    setIsLoading(true); 
    try {
      await deleteFlashcard(id);
      setNotification({ type: 'success', message: `Flashcard deleted successfully!` });
      loadFlashcards(); 
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete flashcard.';
        setError(message);
        setNotification({ type: 'danger', message: message });
        setIsLoading(false); 
    }
  };

  return (
    <>
      <Header title="Manage Flashcards" subtitle="Add, edit, or delete your study cards." />
      <Container>
         {notification && (
            <Alert variant={notification.type} onClose={() => setNotification(null)} dismissible>
                {notification.message}
            </Alert>
        )}
        <Row>
          <Col md={4}>
            <h4 className="mb-3">Add Card</h4>
            <AddFlashcardForm onAddCard={handleAddCard} categories={categories} />
             <hr />
            <h4 className="mb-3">Filter</h4>
             <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
              />
          </Col>
          <Col md={8}>
            <h4 className="mb-3">Your Flashcards ({filteredFlashcards.length})</h4>
            {}
            {isLoading ? <LoadingSpinner fullscreen /> :
             error ? <ErrorMessage message={error} /> :
             <FlashcardList
                flashcards={filteredFlashcards}
                isLoading={false} 
                error={null}      
                onEdit={handleEditCard}
                onDelete={handleDeleteCard}
             />
            }
          </Col>
        </Row>

        {}
        <EditFlashcardModal
          show={editModalShow}
          handleClose={() => { setEditModalShow(false); setCardToEdit(null); }}
          cardToEdit={cardToEdit}
          onUpdateCard={handleUpdateCard}
          categories={categories}
        />
      </Container>
    </>
  );
};

export default ManageFlashcardsPage;