import React, { useState, lazy, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { darkTheme, lightTheme } from './utils/Themes';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { FaArrowUp, FaMoon, FaSun } from 'react-icons/fa';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: ${({ show }) => show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 50%;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 2px solid ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Google Analytics
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Portfolio',
        page_location: window.location.href
      });
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.gtag) {
      window.gtag('event', 'scroll_to_top', {
        event_category: 'engagement'
      });
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Router>
          <GlobalStyle />
          <Navbar />
          <HeroSection />
          <Suspense fallback={<LoadingSpinner />}>
            <About />
            <Skills />
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
            <Education />
            <Contact />
            <Footer />
            {openModal.state && (
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            )}
          </Suspense>
          
          <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
          
          <ScrollToTop show={showScrollTop} onClick={scrollToTop}>
            <FaArrowUp />
          </ScrollToTop>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;