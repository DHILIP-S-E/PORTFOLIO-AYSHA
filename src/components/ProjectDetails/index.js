import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary}20;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
`;

const Tag = styled.span`
  padding: 6px 12px;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ primary, theme }) => primary ? theme.primary : 'transparent'};
  color: ${({ primary, theme }) => primary ? 'white' : theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;

  if (!project) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenModal({ state: false, project: null });
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <CloseButton onClick={() => setOpenModal({ state: false, project: null })}>
          <FaTimes />
        </CloseButton>
        
        {project.image && (
          <ProjectImage src={project.image} alt={project.title} />
        )}
        
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        
        {project.tags && (
          <TagsContainer>
            {project.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
        
        <ButtonGroup>
          {project.github && (
            <ActionButton href={project.github} target="_blank" rel="noopener noreferrer">
              <FaGithub /> View Code
            </ActionButton>
          )}
          {project.webapp && (
            <ActionButton href={project.webapp} target="_blank" rel="noopener noreferrer" primary>
              <FaExternalLinkAlt /> Live Demo
            </ActionButton>
          )}
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};

export default ProjectDetails;