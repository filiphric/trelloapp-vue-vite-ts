import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/store';
import { useClickOutside } from '@/hooks/useClickOutside';

const Search: React.FC = () => {
  const searchCard = useStore((s) => s.searchCard);
  const toggleSearch = useStore((s) => s.toggleSearch);
  const searchResults = useStore((s) => s.searchResults);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => toggleSearch(false));

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const triggerSearch = () => {
    if (searchQuery.length) {
      searchCard(searchQuery);
    }
 else {
      useStore.setState({ searchResults: [] });
    }
  };

  return (
    <div className="grid fixed z-50 place-content-center w-screen h-screen" style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
      <div className="shadow-lg" ref={wrapperRef}>
        <div className="mb-1 text-xs text-gray-200">Search cards</div>
        <input
          ref={searchRef}
          value={searchQuery}
          type="text"
          className="px-3 w-96 h-14 text-2xl bg-white border-b-2 border-slate-300 outline-none"
          data-test-id="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={triggerSearch}
        />
        {searchResults.map((result: any) => (
          <div key={result.id} data-test-id="result-item" className="flex w-96 h-12 text-xl bg-white border-slate-600 border-b-1">
            <a href={`/board/${result.boardId}?card=${result.id}`} className="place-self-center py-3 px-3 w-full h-full">
              {result.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
