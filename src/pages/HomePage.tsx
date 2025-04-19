import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Reuse Header

const HomePage: React.FC = () => {
  return (
    <>
      <Header title="Welcome to Flashcard Master!" subtitle="Your journey to knowledge starts here." />
      <Container>
        <Row className="justify-content-center text-center mt-4">
          <Col md={8}>
            <p className="lead mb-4">
              Create, manage, and study your flashcards efficiently. Get started by exploring your options below.
            </p>
          </Col>
        </Row>
        <Row className="mt-3 text-center g-4">
           <Col md={6}>
             <Card className="h-100">
               <Card.Body className="d-flex flex-column justify-content-center">
                 <Card.Title>Study Your Cards</Card.Title>
                 <Card.Text>
                    Flip through your flashcards, test your knowledge, and master your subjects.
                 </Card.Text>
                 <Button variant="success" as={Link} to="/study" className="mt-auto">
                   Start Studying
                 </Button>
               </Card.Body>
             </Card>
           </Col>
           <Col md={6}>
             <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                 <Card.Title>Manage Your Collection</Card.Title>
                 <Card.Text>
                   Add new flashcards, edit existing ones, or remove cards you no longer need.
                 </Card.Text>
                 <Button variant="primary" as={Link} to="/manage" className="mt-auto">
                   Manage Flashcards
                 </Button>
               </Card.Body>
             </Card>
           </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;