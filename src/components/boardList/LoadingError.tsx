import React from 'react';
import { useStore } from '@/store/store';

const LoadingError: React.FC = () => {
  const loadingError = useStore((s) => s.loadingError);

  return (
    <div className="place-self-center" data-test-id="board-list-error-message">
      <span className="block mb-4 text-8xl font-bold text-center text-gray-200">{loadingError.status}</span>
      <p className="block mb-4 text-center text-gray-400">{loadingError.message || 'There was an error loading your boards'}</p>
      <a href="/" className="block font-semibold text-center text-blue7">
        {' '}
        Try again{' '}
      </a>
    </div>
  );
};

export default LoadingError;
