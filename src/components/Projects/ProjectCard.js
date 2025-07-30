import React from 'react';
import styled, { keyframes } from 'styled-components';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.primary}20;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  animation: ${({ isVisible }) => isVisible ? fadeIn : 'none'} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 12px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
  loading: lazy;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 480px) {
    height: 180px;
    border-radius: 8px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.card_light};
  border-radius: 12px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  
  @media (max-width: 480px) {
    height: 180px;
    border-radius: 8px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
  
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const Tag = styled.span`
  padding: 4px 8px;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  
  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 0.75rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ProjectLink = styled.a`
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary}CC;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const ProjectCard = ({ project, setOpenModal }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <Card ref={ref} isVisible={isVisible} onClick={() => setOpenModal({ state: true, project })}>
      {project.image ? (
        <ProjectImage 
          src={project.image} 
          alt={project.title}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : (
        <ImagePlaceholder>No Image</ImagePlaceholder>
      )}
      
      <ProjectTitle>{project.title}</ProjectTitle>
      <ProjectDescription>{project.description}</ProjectDescription>
      
      {project.tags && (
        <TagsContainer>
          {project.tags.slice(0, 4).map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      )}
      
      <ProjectLinks onClick={(e) => e.stopPropagation()}>
        {project.github && (
          <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
            Code
          </ProjectLink>
        )}
        {project.webapp && (
          <ProjectLink href={project.webapp} target="_blank" rel="noopener noreferrer">
            Live Demo
          </ProjectLink>
        )}
      </ProjectLinks>
    </Card>
  );
};

export default ProjectCard;