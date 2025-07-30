import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadMarkdownCollection } from '../../utils/contentLoader';

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

const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 800px;
`;

const EducationCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 30px;
  border: 1px solid ${({ theme }) => theme.primary}20;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SchoolLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const EducationContent = styled.div`
  flex: 1;
`;

const SchoolName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 5px;
`;

const Degree = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 5px;
`;

const Duration = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 5px;
`;

const Grade = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 10px;
  font-weight: 500;
`;

const EducationDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const educationCollection = await loadMarkdownCollection('/content/education');
        setEducation(educationCollection);
      } catch (error) {
        console.error('Error loading education:', error);
      }
    };
    fetchEducation();
  }, []);

  return (
    <Container id="education">
      <Title>Education</Title>
      <Description>
        My educational journey has been focused on building a strong foundation in data science and technology.
      </Description>
      
      <EducationList>
        {education.map((edu, index) => (
          <EducationCard key={index}>
            {edu.img && <SchoolLogo src={edu.img} alt={edu.school} />}
            <EducationContent>
              <SchoolName>{edu.school}</SchoolName>
              {edu.degree && <Degree>{edu.degree}</Degree>}
              }
              <Duration>{edu.date}</Duration>
              {edu.grade && <Grade>Grade: {edu.grade}</Grade>}
              }
              <EducationDescription>{edu.desc}</EducationDescription>
            </EducationContent>
          </EducationCard>
        ))}
      </EducationList>
    </Container>
  );
};

export default Education;