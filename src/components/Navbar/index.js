import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  background: ${({ theme }) => theme.card_light};
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
`;

const NavLogo = styled.a`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 70px;
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const NavButton = styled.a`
  border: 2px solid ${({ theme }) => theme.primary};
  background: transparent;
  color: ${({ theme }) => theme.primary};
  padding: 8px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
    z-index: 1001;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 100px;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.card_light};
  z-index: 1000;
  
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const MobileLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <Nav>
      <NavContainer>
        <NavLogo href="#about">Portfolio</NavLogo>
        
        <NavMenu role="navigation" aria-label="Main navigation">
          <NavItem>
            <NavLink href="#about" aria-label="About section">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#skills" aria-label="Skills section">Skills</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#projects" aria-label="Projects section">Projects</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#education" aria-label="Education section">Education</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#contact" aria-label="Contact section">Contact</NavLink>
          </NavItem>
        </NavMenu>
        
        <NavButton href="https://github.com/aysha-dheesan-banu" target="_blank" rel="noopener noreferrer">
          GitHub
        </NavButton>
        
        <MobileIcon 
          onClick={toggleMenu}
          role="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>
        
        <MobileMenu isOpen={isOpen}>
          <MobileLink href="#about" onClick={closeMenu}>About</MobileLink>
          <MobileLink href="#skills" onClick={closeMenu}>Skills</MobileLink>
          <MobileLink href="#projects" onClick={closeMenu}>Projects</MobileLink>
          <MobileLink href="#education" onClick={closeMenu}>Education</MobileLink>
          <MobileLink href="#contact" onClick={closeMenu}>Contact</MobileLink>
          <NavButton 
            href="https://github.com/aysha-dheesan-banu" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'block', marginTop: '2rem' }}
          >
            GitHub
          </NavButton>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;