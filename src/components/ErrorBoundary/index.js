import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  flex-direction: column;
  gap: 20px;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const ErrorButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: ${({ theme }) => theme.primary}CC;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <p>We're sorry, but something unexpected happened.</p>
          <ErrorButton onClick={() => window.location.reload()}>
            Reload Page
          </ErrorButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;