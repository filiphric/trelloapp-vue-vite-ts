import React, { useState } from 'react';
import ListType from '@/typings/list';
import Dots from '@/assets/icons/dots.svg';
import Dropdown from '@/components/common/Dropdown';
import DropdownItem from '@/components/common/DropdownItem';
import { useStore } from '@/store/store';

interface ListOptionsProps {
  list: ListType;
  onToggleInput: (flag: boolean) => void;
}

const ListOptions: React.FC<ListOptionsProps> = ({ list, onToggleInput }) => {
  const deleteList = useStore((s) => s.deleteList);
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <button
        data-test-id="list-options"
        className="inline-grid self-center ml-2 w-8 h-8 text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
        onClick={() => setDropdown(true)}
      >
        <Dots className="inline-block flex-grow-0 place-self-end p-1.5 w-8 h-8 text-gray10 bg-transparent hover:bg-gray4 active:bg-gray7 rounded-sm border-2 border-transparent cursor-pointer" />
      </button>
      {dropdown && (
        <Dropdown data-test-id="list-dropdown" header="List actions" onClose={() => setDropdown(false)}>
          <DropdownItem
            itemText="Add another card"
            data-test-id="card-add"
            onClick={() => {
              onToggleInput(true);
              setDropdown(false);
            }}
          />
          <DropdownItem
            itemText="Delete list"
            warning={true}
            data-test-id="delete-list"
            onClick={() => {
              deleteList(list.id);
              setDropdown(false);
            }}
          />
        </Dropdown>
      )}
    </>
  );
};

export default ListOptions;
