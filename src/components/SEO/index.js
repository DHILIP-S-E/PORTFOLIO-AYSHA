import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title || 'Aysha Dheesan Banu - Portfolio';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Full Stack Developer & Data Scientist Portfolio');
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'React, Python, Data Science, Web Development');
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;