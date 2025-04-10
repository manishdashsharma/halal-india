import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { leadsViewSubTabState, leadCenterCountsState, leadCenterCurrentPageState } from '../../../state/leadsCenterState';

const SUB_TABS = ['New Leads', 'Applications'];

const LeadsSubTabs = () => {
  const [activeSubTab, setActiveSubTab] = useRecoilState(leadsViewSubTabState);
  const setCurrentPage = useSetRecoilState(leadCenterCurrentPageState); // Need setter only
  const counts = useRecoilValue(leadCenterCountsState);

  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
    setCurrentPage(1); // Reset page when changing sub-tabs
  };

  const getCountForTab = (tabName) => {
     if (tabName === 'New Leads') return counts.newLeads;
     if (tabName === 'Applications') return counts.applications;
     return 0;
  }

  return (
    <div className="mb-4 flex items-center space-x-4">
      {SUB_TABS.map((subTab) => (
        <button
          key={subTab}
          onClick={() => handleSubTabClick(subTab)}
          className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors duration-150
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

export default LeadsSubTabs;