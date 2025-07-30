import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { loadMarkdownFile } from '../../utils/contentLoader';

const HeroContainer = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.card_light} 0%, ${({ theme }) => theme.bg} 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 60px;
  
  @media (max-width: 960px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    justify-content: center;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  max-width: 600px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.card};
  border-radius: 50%;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    transform: translateY(-5px);
  }
`;

const ResumeButton = styled.a`
  display: inline-block;
  padding: 15px 30px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.primary}CC 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-top: 30px;
  text-align: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px ${({ theme }) => theme.primary}40;
  }
`;

const ProfileImage = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 30px ${({ theme }) => theme.primary}40;
  
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
`;

const HeroSection = () => {
  const [bio, setBio] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const aboutContent = await loadMarkdownFile('/content/about/index.md');
        setBio(aboutContent.frontmatter);

        const resumeContent = await loadMarkdownFile('/content/resume/index.md');
        setResume(resumeContent.frontmatter);
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };
    fetchContent();
  }, []);

  if (!bio || !resume) {
    return (
      <HeroContainer>
        <div>Loading...</div>
      </HeroContainer>
    );
  }

  return (
    <HeroContainer id="about">
      <HeroContent>
        <LeftSection>
          <Title>
            Hi, I'm <span style={{ color: '#854CE6' }}>{bio.name}</span>
          </Title>
          
          <Subtitle>
            <Typewriter
              options={{
                strings: bio.roles || ['Developer'],
                autoStart: true,
                loop: true,
              }}
            />
          </Subtitle>
          
          <Description>{bio.description}</Description>
          
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
          
          {resume.resume_file && (
            <ResumeButton href={resume.resume_file} target="_blank" rel="noopener noreferrer">
              {resume.button_text || 'View Resume'}
            </ResumeButton>
          )}
        </LeftSection>

        <RightSection>
          <ProfileImage src="/Hero Image.jpg.jpeg" alt="Profile" />
        </RightSection>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;