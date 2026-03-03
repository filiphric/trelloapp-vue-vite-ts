import React from 'react';

interface SaveButtonProps {
  buttontext?: string;
  onClick?: () => void;
  'data-test-id'?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ buttontext = 'Save', onClick, 'data-test-id': dataTestId }) => {
  return (
    <button
      data-test-id={dataTestId}
      className="inline-block py-1 px-3 mt-1 h-8 text-sm font-normal text-center text-white bg-green7 hover:bg-green6 rounded-sm focus:outline-none"
      style={{ width: 'fit-content' }}
      onClick={onClick}
    >
      {buttontext}
    </button>
  );
};

export default SaveButton;
