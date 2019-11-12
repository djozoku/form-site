import { useState, useEffect } from 'react';

function getSize() {
  return {
    height: window.outerHeight,
    width: window.outerWidth
  };
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
