// src/components/LeadCenter/LeadCenterComponent.jsx
import React, { useEffect, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  leadCenterMainTabState,
  leadsViewSubTabState,
  allocatedViewSubTabState, // Import allocated sub-tab state
  leadCenterSearchQueryState,
  leadCenterCurrentPageState,
  leadCenterItemsPerPageState,
  leadCenterFilterState,
  leadCenterDataViewState,
  leadCenterCountsState,
  userApprovalDashboardState,
} from '../../state/leadsCenterState';
import { fetchLeadCenterData } from '../../api/leadsCenterApi';

import MainTabs from './LeadsCenterMainTab';
import LeadsView from './subTabs/LeadsView';
import ApprovedView from './subTabs/ApprovedView';
import AllocatedView from './subTabs/AllocatedView'; // Import AllocatedView
import ApprovalDashboard from '../ApprovalDashboard/ApprovalDashboard';

const LeadCenterComponent = () => {
  const mainTab = useRecoilValue(leadCenterMainTabState);
  const LeadsSubTabs = useRecoilValue(leadsViewSubTabState);
  const allocatedSubTab = useRecoilValue(allocatedViewSubTabState); // Get allocated sub-tab value
  const searchQuery = useRecoilValue(leadCenterSearchQueryState);
  const currentPage = useRecoilValue(leadCenterCurrentPageState);
  const itemsPerPage = useRecoilValue(leadCenterItemsPerPageState);
  const filters = useRecoilValue(leadCenterFilterState);

  const setDataView = useSetRecoilState(leadCenterDataViewState);
  const setCounts = useSetRecoilState(leadCenterCountsState);
  const {open , lead} = useRecoilValue(userApprovalDashboardState)

  // *** UPDATED useCallback dependencies ***
  const fetchData = useCallback(async () => {
      console.log('Fetching Data Triggered');
      setDataView((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
         const result = await fetchLeadCenterData({
             mainTab,
             LeadsSubTabs: mainTab === 'Leads' ? LeadsSubTabs : null,
             allocatedSubTab: mainTab === 'Allocated' ? allocatedSubTab : null, // Pass correct sub-tab
             page: currentPage,
             itemsPerPage,
             searchQuery,
             filters,
         });
         setDataView({
             data: result.data,
             totalItems: result.totalItems,
             isLoading: false,
             error: null,
         });
         setCounts(result.counts);
      } catch (err) {
         console.error('Failed to fetch lead center data:', err);
         setDataView((prev) => ({ ...prev, data: [], totalItems: 0, isLoading: false, error: err.message || 'An error occurred' }));
      }
      // Dependencies now include allocatedSubTab
  }, [mainTab, LeadsSubTabs, allocatedSubTab, searchQuery, currentPage, itemsPerPage, filters, setDataView, setCounts]);


  useEffect(() => {
     fetchData();
  }, [fetchData]); // Dependency array uses the memoized fetchData


  // *** UPDATED render logic ***
  const renderContentView = () => {
    switch (mainTab) {
      case 'Leads':
        return <LeadsView />;
      case 'Approved':
        return <ApprovedView />;
      case 'Allocated':
        return <AllocatedView />; // Render AllocatedView
      default:
        return null;
    }
  };

  if(open){
    return (
      <div className=" ">
        <ApprovalDashboard lead={lead} />
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Lead Center</h1>
       <MainTabs />
      <div className="mt-4">{renderContentView()}</div> {/* Added margin top */}
    </div>
  );
};

export default LeadCenterComponent;