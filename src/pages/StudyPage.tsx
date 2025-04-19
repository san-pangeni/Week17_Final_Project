import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import Flashcard from '../components/Flashcard';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getFlashcards } from '../api/flashcardApi';
import { Flashcard as FlashcardType, getUniqueCategories } from '../data/types';
import Header from '../components/Header';

const StudyPage: React.FC = () => {
  const [allFlashcards, setAllFlashcards] = useState<FlashcardType[]>([]);
  const [studyDeck, setStudyDeck] = useState<FlashcardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  
  const loadFlashcards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFlashcards();
      setAllFlashcards(data);
      setCategories(getUniqueCategories(data));
      
      setStudyDeck(data); 
      setCurrentCardIndex(0); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flashcards.');
      setStudyDeck([]); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  
  useEffect(() => {
    let filteredDeck = allFlashcards;
    if (selectedCategory) {
      filteredDeck = allFlashcards.filter(card => card.category === selectedCategory);
    }
    setStudyDeck(filteredDeck);
    setCurrentCardIndex(0); 
  }, [selectedCategory, allFlashcards]);

  const goToNextCard = () => {
    if (studyDeck.length > 0) {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % studyDeck.length);
    }
  };

  const goToPreviousCard = () => {
     if (studyDeck.length > 0) {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + studyDeck.length) % studyDeck.length);
     }
  };

   const shuffleDeck = () => {
        if (studyDeck.length > 1) {
            
            const shuffled = [...studyDeck];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setStudyDeck(shuffled);
            setCurrentCardIndex(0); 
        }
    };


  const currentCard = studyDeck.length > 0 ? studyDeck[currentCardIndex] : null;
  const progress = studyDeck.length > 0 ? ((currentCardIndex + 1) / studyDeck.length) * 100 : 0;

  return (
     <>
      <Header title="Study Session" subtitle="Review your flashcards." />
      <Container>
        <Row className="mb-4">
          <Col md={4}>
             <h4 className="mb-3">Options</h4>
             <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
             />
             <Button variant="secondary" onClick={shuffleDeck} disabled={studyDeck.length < 2 || isLoading} className="mt-2 w-100">
                Shuffle Deck
             </Button>
          </Col>
          <Col md={8}>
             <h4 className="mb-3 text-center">Current Card ({studyDeck.length > 0 ? currentCardIndex + 1 : 0} / {studyDeck.length})</h4>
             {isLoading ? (
                <LoadingSpinner fullscreen />
             ) : error ? (
                <ErrorMessage message={error} />
             ) : currentCard ? (
                 <>
                    <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />
                    <Flashcard
                        cardData={currentCard}
                        onEdit={() => {}} // No edit/delete in study mode
                        onDelete={() => {}}
                        showControls={false} // Hide controls
                    />
                    <div className="d-flex justify-content-between mt-3">
                        <Button onClick={goToPreviousCard} disabled={studyDeck.length < 2}>
                        Previous
                        </Button>
                        <Button onClick={goToNextCard} disabled={studyDeck.length < 2}>
                        Next
                        </Button>
                    </div>
                 </>
             ) : (
                <p className="text-center text-muted mt-5">
                  {selectedCategory ? `No flashcards found in the "${selectedCategory}" category.` : 'No flashcards available to study. Add some!'}
                </p>
             )}
          </Col>
        </Row>
      </Container>
     </>
  );
};

export default StudyPage;