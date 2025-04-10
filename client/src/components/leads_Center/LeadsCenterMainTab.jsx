// src/components/LeadCenter/MainTabs.jsx
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { leadCenterMainTabState, leadCenterCurrentPageState } from '../../state/leadsCenterState';

const TABS = ['Leads', 'Approved', 'Allocated']; // Ensure 'Allocated' is included

const MainTabs = () => {
  const [activeTab, setActiveTab] = useRecoilState(leadCenterMainTabState);
  const setCurrentPage = useSetRecoilState(leadCenterCurrentPageState);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset page when changing main tabs
  };

  return (
    <div className="border-b border-gray-200 mb-4">
      <nav className="-mb-px flex space-x-6 flex-wrap" aria-label="Tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm focus:outline-none mb-2
              ${
                activeTab === tab
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MainTabs;