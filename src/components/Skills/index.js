import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadMarkdownFile } from '../../utils/contentLoader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, ${({ theme }) => theme.card_light}20 0%, ${({ theme }) => theme.bg} 100%);
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
  margin-bottom: 50px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;

const SkillCategory = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 30px;
  border: 1px solid ${({ theme }) => theme.primary}20;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  text-align: center;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary}15;
  border: 1px solid ${({ theme }) => theme.primary}30;
  border-radius: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const SkillIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Skills = () => {
  const [skillsData, setSkillsData] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsContent = await loadMarkdownFile('/content/skills/index.md');
        setSkillsData(skillsContent.frontmatter);
      } catch (error) {
        console.error('Error loading skills:', error);
      }
    };
    fetchSkills();
  }, []);

  if (!skillsData) {
    return (
      <Container>
        <div>Loading skills...</div>
      </Container>
    );
  }

  return (
    <Container id="skills">
      <Title>Skills</Title>
      <Description>
        Here are the technologies and tools I work with to bring ideas to life.
      </Description>
      
      <SkillsGrid>
        {skillsData?.skills?.map((category, index) => (
          <SkillCategory key={index}>
            <CategoryTitle>{category.title}</CategoryTitle>
            <SkillsList>
              {category.skills?.map((skill, skillIndex) => (
                <SkillItem key={skillIndex}>
                  <SkillIcon src={skill.image} alt={skill.name} />
                  {skill.name}
                </SkillItem>
              ))}
            </SkillsList>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </Container>
  );
};

export default Skills;