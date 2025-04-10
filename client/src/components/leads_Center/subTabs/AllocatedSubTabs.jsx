// src/components/LeadCenter/AllocatedSubTabs.jsx
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { allocatedViewSubTabState, leadCenterCountsState, leadCenterCurrentPageState } from '../../../state/leadsCenterState';

// Define the sub-tabs for the Allocated view
const SUB_TABS = ['Leads', 'Applications', 'Approved'];

const AllocatedSubTabs = () => {
  const [activeSubTab, setActiveSubTab] = useRecoilState(allocatedViewSubTabState);
  const setCurrentPage = useSetRecoilState(leadCenterCurrentPageState);
  const counts = useRecoilValue(leadCenterCountsState);

  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
    setCurrentPage(1); // Reset page when changing sub-tabs
  };

  // Helper to get the correct count based on the sub-tab name
  const getCountForTab = (tabName) => {
     switch(tabName) {
         case 'Leads': return counts.allocatedLeads;
         case 'Applications': return counts.allocatedApplications;
         case 'Approved': return counts.allocatedApproved;
         default: return 0;
     }
  }

  return (
    <div className="mb-4 flex items-center space-x-4 flex-wrap"> {/* Added flex-wrap */}
      {SUB_TABS.map((subTab) => (
        <button
          key={subTab}
          onClick={() => handleSubTabClick(subTab)}
          className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors duration-150 mb-2
            ${
              activeSubTab === subTab
                ? 'bg-green-100 text-green-700' // Active sub-tab style
                : 'text-gray-600 hover:bg-gray-100' // Inactive sub-tab style
            }`}
        >
          {subTab}
          <span className="ml-1.5 text-xs font-normal bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
             {getCountForTab(subTab)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default AllocatedSubTabs;