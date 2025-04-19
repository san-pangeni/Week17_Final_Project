import React from 'react';
import { Container } from 'react-bootstrap';


interface HeaderProps {
    title?: string;
    subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Flashcard Master", subtitle = "Your Personal Study Companion" }) => {
  return (
    <header className="app-header text-center">
      <Container>
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
      </Container>
    </header>
  );
};

export default Header;