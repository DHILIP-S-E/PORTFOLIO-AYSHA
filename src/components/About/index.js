import React from 'react';
import styled from 'styled-components';

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
  max-width: 800px;
  line-height: 1.6;
`;

const About = () => {
  return (
    <Container id="about-section">
      <Title>About Me</Title>
      <Description>
        I am a passionate Data Science student with expertise in Python, Machine Learning, 
        and cloud technologies. I love creating innovative solutions and have experience 
        working with various data science tools and frameworks. I'm always eager to learn 
        new technologies and take on challenging projects that push the boundaries of 
        what's possible with data.
      </Description>
    </Container>
  );
};

export default About;