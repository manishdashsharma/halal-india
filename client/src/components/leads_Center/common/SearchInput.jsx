import React, { useState, useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { leadCenterSearchQueryState, leadCenterCurrentPageState } from '../../../state/leadsCenterState';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce'; // Install: npm i lodash.debounce

const SearchInput = ({ placeholder = 'Search...' }) => {
  const [localQuery, setLocalQuery] = useState('');
  const setSearchQuery = useSetRecoilState(leadCenterSearchQueryState);
  const setCurrentPage = useSetRecoilState(leadCenterCurrentPageState);

  // Debounce the Recoil state update
  const debouncedSetRecoilState = useCallback(
    debounce((query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset page to 1 on new search
    }, 500), // 500ms delay
    [setSearchQuery, setCurrentPage]
  );

  useEffect(() => {
    debouncedSetRecoilState(localQuery);
    // Cleanup function to cancel debounce on unmount
    return () => debouncedSetRecoilState.cancel();
  }, [localQuery, debouncedSetRecoilState]);

  const handleChange = (event) => {
    setLocalQuery(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={localQuery}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchInput;