import React, { useRef } from 'react';
import Cross from '@/assets/icons/cross.svg';
import { useClickOutside } from '@/hooks/useClickOutside';

interface DropdownProps {
  header?: string;
  onClose: () => void;
  children?: React.ReactNode;
  'data-test-id'?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ header, onClose, children, 'data-test-id': dataTestId }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  return (
    <div ref={ref} data-test-id={dataTestId} className="absolute top-11 left-2 z-10 py-2 w-dropdown bg-white rounded-sm shadow-xl">
      <div className="mt-0.5 h-7 text-sm text-center text-gray-600">{header}</div>
      <Cross data-test-id="cancel" className="absolute top-1 right-1 px-2 w-8 h-8 text-gray-600 cursor-pointer" onClick={onClose} />
      <hr />
      {children}
    </div>
  );
};

export default Dropdown;
