import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import ProjectSearch from '../ProjectSearch';
import SEO from '../SEO';
import { loadMarkdownCollection } from '../../utils/contentLoader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  background: ${({ theme }) => theme.bg};
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 30px;
  }
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${({ theme }) => theme.primary};
  background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.primary};
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const Projects = ({ openModal, setOpenModal }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = await loadMarkdownCollection('/content/projects');
        setProjects(projectCollection);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = projects
    .filter(project => filter === 'All' || project.category === filter)
    .filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );

  return (
    <Container id="projects">
      <SEO 
        title="Projects - Aysha Dheesan Banu"
        description="Explore my portfolio of web development and data science projects"
        keywords="React projects, Python projects, Data Science, Web Development"
      />
      <Title>Projects</Title>
      <Description>
        Here are some of the projects I've worked on, showcasing my skills in various technologies.
      </Description>
      
      <ProjectSearch onSearch={setSearchTerm} />
      
      <FilterButtons>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterButtons>
      
      <ProjectsGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            setOpenModal={setOpenModal}
          />
        ))}
      </ProjectsGrid>
    </Container>
  );
};

export default Projects;