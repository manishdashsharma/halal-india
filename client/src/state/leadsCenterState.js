import { atom } from 'recoil';

// --- UI State Atoms ---

export const leadCenterMainTabState = atom({
  key: 'leadCenterMainTabState',
  default: 'Leads', // 'Leads', 'Approved' ,'Allocated'
});

export const leadsViewSubTabState = atom({
  key: 'leadsViewSubTabState',
  default: 'New Leads', // 'New Leads', 'Applications' (Relevant only when main tab is 'Leads')
});
export const allocatedViewSubTabState = atom({
    key: 'allocatedViewSubTabState',
    default: 'Leads', // Default sub-tab for Allocated view: 'Leads', 'Applications', 'Approved'
  });

export const leadCenterSearchQueryState = atom({
  key: 'leadCenterSearchQueryState',
  default: '',
});

export const leadCenterCurrentPageState = atom({
  key: 'leadCenterCurrentPageState',
  default: 1,
});

export const leadCenterItemsPerPageState = atom({
  key: 'leadCenterItemsPerPageState',
  default: 10, // Or load from user preferences/config
});

// Atom to hold filter criteria (example structure)
export const leadCenterFilterState = atom({
  key: 'leadCenterFilterState',
  default: {}, // e.g., { status: 'active', assignedTo: 'user123' }
});


// --- Data State Atoms ---

// Holds the data fetched for the *currently active* view/tab/page/filters
export const leadCenterDataViewState = atom({
    key: 'leadCenterDataViewState',
    default: {
        data: [],
        totalItems: 0,
        isLoading: true,
        error: null,
    },
});

// Holds counts for tabs/sub-tabs if needed separately
export const leadCenterCountsState = atom({
    key: 'leadCenterCountsState',
    default: {
        newLeads: 0, // Example: Will be updated by fetch
        applications: 0,
        approved: 0,
        allocatedLeads: 0,
        allocatedApplications: 0,
        allocatedApproved: 0,
    },
});