import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { loadMarkdownFile } from '../../utils/contentLoader';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.card_light};
  padding: 40px 20px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.card};
  border-radius: 50%;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.primary}20;
  padding-top: 20px;
`;

const Footer = () => {
  const [bio, setBio] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const bioContent = await loadMarkdownFile('/content/about/index.md');
        setBio(bioContent.frontmatter);
      } catch (error) {
        console.error('Error loading bio:', error);
      }
    };
    fetchBio();
  }, []);

  if (!bio) {
    return null;
  }

  return (
    <FooterContainer>
      <FooterContent>
        <Name>{bio.name}</Name>
        
        <Navigation>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Navigation>
        
        <SocialLinks>
          {bio.linkedin && (
            <SocialLink href={bio.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
          )}
          {bio.github && (
            <SocialLink href={bio.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
          )}
          <SocialLink href="mailto:dheesanaysha@gmail.com">
            <FaEnvelope />
          </SocialLink>
        </SocialLinks>
        
        <Copyright>
          © {new Date().getFullYear()} {bio.name}. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;