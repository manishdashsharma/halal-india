import React from 'react';
import { useSetRecoilState } from 'recoil';
import { leadCenterFilterState, leadCenterCurrentPageState } from '../../../state/leadsCenterState';
import SearchInput from './SearchInput';
import { FaFilter } from 'react-icons/fa';

const Toolbar = ({ showSearch = true, showFilter = true, searchPlaceholder = 'Search...' }) => {
  const setFilters = useSetRecoilState(leadCenterFilterState);
  const setCurrentPage = useSetRecoilState(leadCenterCurrentPageState);

  const handleFilterClick = () => {
    console.log('Filter button clicked - Open Filter Modal/Drawer here');
    // Example: Apply a dummy filter to test data refetching
    // setFilters(prev => ({ ...prev, status: 'dummy_filter' }));
    // setCurrentPage(1); // Reset page when filters change
  };

  return (
    <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
      <div className="flex-grow min-w-[250px]">
          {showSearch && <SearchInput placeholder={searchPlaceholder}/>}
      </div>
      {showFilter && (
        <button
          onClick={handleFilterClick}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaFilter className="mr-2 text-gray-500" />
          Filter
        </button>
       )}
    </div>
  );
};

export default Toolbar;