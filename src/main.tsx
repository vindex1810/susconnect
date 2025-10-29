import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
useEffect(() => {
  // Remover elementos do Bolt
  const removeBoltElements = () => {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (
        el.innerHTML?.includes('bolt.host') ||
        el.src?.includes('bolt') ||
        el.className?.includes('bolt')
      ) {
        el.remove();
      }
    });
  };

  removeBoltElements();
  setTimeout(removeBoltElements, 1000);
  setTimeout(removeBoltElements, 3000);
}, []);
