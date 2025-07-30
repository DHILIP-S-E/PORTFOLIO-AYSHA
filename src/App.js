import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { darkTheme } from './utils/Themes';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetails from './components/ProjectDetails';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <GlobalStyle />
          <Navbar />
          <HeroSection />
          <About />
          <Skills />
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Education />
          <Contact />
          <Footer />
          {openModal.state && (
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;