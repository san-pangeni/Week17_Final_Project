import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center text-muted py-3">
      <Container>
        <p>&copy; {currentYear} Flashcard App. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;