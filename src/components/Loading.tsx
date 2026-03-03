import React from 'react';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import { useStore } from '@/store/store';

const Loading: React.FC = () => {
  const loading = useStore((s) => s.loading);
  const loadingError = useStore((s) => s.loadingError);

  if (!loading) return null;

  return (
    <div className="block place-self-center text-center">
      <LoadingIcon className="inline-block mb-1" />
      &nbsp;&nbsp;Loading data ...
      {loadingError.tooLong && (
        <div className="block mt-4">
          This is taking too long.
          <a href="/" className="font-semibold text-center text-blue7">
            {' '}
            Reload?{' '}
          </a>
        </div>
      )}
    </div>
  );
};

export default Loading;
