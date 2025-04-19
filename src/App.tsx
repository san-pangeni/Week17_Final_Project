import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ManageFlashcardsPage from './pages/ManageFlashcardsPage';
import StudyPage from './pages/StudyPage';


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> {}
        <NavBar />
        {}
        <main className="flex-grow-1"> {}
           {}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manage" element={<ManageFlashcardsPage />} />
              <Route path="/study" element={<StudyPage />} />
              {}
              <Route path="*" element={<HomePage />} /> {}
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;