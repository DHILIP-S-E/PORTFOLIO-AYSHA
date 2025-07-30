import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { loadMarkdownFile } from '../../utils/contentLoader';

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
  margin-bottom: 50px;
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.primary}20;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.primary}30;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.primary}30;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.primary}CC 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.primary}40;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  background: ${({ type, theme }) => 
    type === 'success' ? '#4CAF50' : 
    type === 'error' ? '#f44336' : 'transparent'};
  color: white;
  display: ${({ show }) => show ? 'block' : 'none'};
`;

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ show: false, type: '', text: '' });
  const form = useRef();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactContent = await loadMarkdownFile('/content/contact/index.md');
        setContactData(contactContent.frontmatter);
      } catch (error) {
        console.error('Error loading contact data:', error);
      }
    };
    fetchContact();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_tox7kqs',
        'template_nv7k7mj',
        form.current,
        'SybVGsYS52j2TfLbi'
      );
      
      setMessage({
        show: true,
        type: 'success',
        text: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      form.current.reset();
    } catch (error) {
      setMessage({
        show: true,
        type: 'error',
        text: 'Failed to send message. Please try again.'
      });
    }

    setIsSubmitting(false);
    setTimeout(() => setMessage({ show: false, type: '', text: '' }), 5000);
  };

  if (!contactData) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container id="contact">
      <Title>Contact</Title>
      <Description>{contactData.description}</Description>
      
      <ContactForm ref={form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="from_name">Name</Label>
          <Input
            type="text"
            id="from_name"
            name="from_name"
            placeholder="Your Name"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="from_email">Email</Label>
          <Input
            type="email"
            id="from_email"
            name="from_email"
            placeholder="your.email@example.com"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            placeholder="Your message..."
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </SubmitButton>
        
        <Message show={message.show} type={message.type}>
          {message.text}
        </Message>
      </ContactForm>
    </Container>
  );
};

export default Contact;