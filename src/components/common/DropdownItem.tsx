import React from 'react';

interface DropdownItemProps {
  itemText?: string;
  warning?: boolean;
  onClick?: () => void;
  'data-test-id'?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ itemText = 'Item text', warning = false, onClick, 'data-test-id': dataTestId }) => {
  return (
    <div
      data-test-id={dataTestId}
      className={`block py-1 px-2 pt-2 text-sm text-gray-700 hover:bg-gray1 active:bg-gray2 cursor-pointer ${warning ? 'text-red-600' : ''}`}
      onClick={onClick}
    >
      {itemText}
    </div>
  );
};

export default DropdownItem;
