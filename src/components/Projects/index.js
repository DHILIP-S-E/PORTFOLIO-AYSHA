import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
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
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;

const Projects = ({ openModal, setOpenModal }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

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
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <Container id="projects">
      <Title>Projects</Title>
      <Description>
        Here are some of the projects I've worked on, showcasing my skills in various technologies.
      </Description>
      
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