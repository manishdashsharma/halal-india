// src/api/mockLeadCenterApi.js

// --- Mock Data ---
// In a real app, this data comes from your backend based on query params

const allMockLeads = [
    // Add ~20-30 diverse lead objects here for pagination testing
    { id: 1, type: 'New Lead', initials: 'AK', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Atif khan', mobile: '+91-9897765443', inquiredFor: 'Halal certificate', avatarBg: '#d1c4e9', avatarColor: '#311b92', status: null },
    { id: 2, type: 'New Lead', initials: 'JB', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Jakob Bengson (Renewal)', mobile: '+1 (555) 876-5432', inquiredFor: 'Medical tourism assistance', avatarBg: '#c5cae9', avatarColor: '#1a237e', status: null },
    { id: 3, type: 'New Lead', initials: 'TC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Talan Curtis', mobile: '+1 (555) 432-1098', inquiredFor: 'Medical tourism assistance', avatarBg: '#bbdefb', avatarColor: '#0d47a1', status: null },
    { id: 4, type: 'New Lead', initials: 'KC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Kadin Ceildt', mobile: '+1 (555) 789-0123', inquiredFor: 'Halal certificate', avatarBg: '#dcedc8', avatarColor: '#33691e', status: null },
    { id: 5, type: 'New Lead', initials: 'AH', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Ahmed khan', mobile: '+1 (555) 456-7890', inquiredFor: 'Halal certificate', avatarBg: '#ffcdd2', avatarColor: '#b71c1c', status: null },
    { id: 6, type: 'New Lead', initials: 'JB', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Jakob Bengson', mobile: '+1 (555) 876-5433', inquiredFor: 'Medical tourism assistance', avatarBg: '#c5cae9', avatarColor: '#1a237e', status: null },
    { id: 7, type: 'New Lead', initials: 'TC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Talan Curtis II', mobile: '+1 (555) 432-1097', inquiredFor: 'Halal Certificate', avatarBg: '#bbdefb', avatarColor: '#0d47a1', status: null },
    { id: 8, type: 'New Lead', initials: 'AA', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Another Atif', mobile: '+91-1234567890', inquiredFor: 'Halal certificate', avatarBg: '#d1c4e9', avatarColor: '#311b92', status: null },
    { id: 9, type: 'New Lead', initials: 'SA', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Sara Ahmed', mobile: '+1 (555) 111-2222', inquiredFor: 'Cosmetic Certification', avatarBg: '#f8bbd0', avatarColor: '#880e4f', status: null },
    { id: 10, type: 'New Lead', initials: 'MJ', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Michael Jones', mobile: '+1 (555) 333-4444', inquiredFor: 'Medical Tourism', avatarBg: '#e1bee7', avatarColor: '#4a148c', status: null },
    // ... Add more leads (ids 11-20+)
    { id: 11, type: 'New Lead', initials: 'AK', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Atif khan', mobile: '+91-9897765443', inquiredFor: 'Halal certificate', avatarBg: '#d1c4e9', avatarColor: '#311b92', status: null },
    { id: 12, type: 'New Lead', initials: 'JB', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Jakob Bengson (Renewal)', mobile: '+1 (555) 876-5432', inquiredFor: 'Medical tourism assistance', avatarBg: '#c5cae9', avatarColor: '#1a237e', status: null },
    { id: 13, type: 'New Lead', initials: 'TC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Talan Curtis', mobile: '+1 (555) 432-1098', inquiredFor: 'Medical tourism assistance', avatarBg: '#bbdefb', avatarColor: '#0d47a1', status: null },
    { id: 14, type: 'New Lead', initials: 'KC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Kadin Ceildt', mobile: '+1 (555) 789-0123', inquiredFor: 'Halal certificate', avatarBg: '#dcedc8', avatarColor: '#33691e', status: null },
    { id: 15, type: 'New Lead', initials: 'AH', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Ahmed khan', mobile: '+1 (555) 456-7890', inquiredFor: 'Halal certificate', avatarBg: '#ffcdd2', avatarColor: '#b71c1c', status: null },
    { id: 16, type: 'New Lead', initials: 'JB', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Jakob Bengson', mobile: '+1 (555) 876-5433', inquiredFor: 'Medical tourism assistance', avatarBg: '#c5cae9', avatarColor: '#1a237e', status: null },
    { id: 17, type: 'New Lead', initials: 'TC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Talan Curtis II', mobile: '+1 (555) 432-1097', inquiredFor: 'Halal Certificate', avatarBg: '#bbdefb', avatarColor: '#0d47a1', status: null },
    { id: 18, type: 'New Lead', initials: 'AA', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Another Atif', mobile: '+91-1234567890', inquiredFor: 'Halal certificate', avatarBg: '#d1c4e9', avatarColor: '#311b92', status: null },
    { id: 19, type: 'New Lead', initials: 'SA', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Sara Ahmed', mobile: '+1 (555) 111-2222', inquiredFor: 'Cosmetic Certification', avatarBg: '#f8bbd0', avatarColor: '#880e4f', status: null },
    { id: 20, type: 'New Lead', initials: 'MJ', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Michael Jones', mobile: '+1 (555) 333-4444', inquiredFor: 'Medical Tourism', avatarBg: '#e1bee7', avatarColor: '#4a148c', status: null },
    // ... Add more leads (ids 11-20+)
    { id: 21, type: 'Application', initials: 'LI', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Liam Ibrahim', mobile: '+966-123456789', inquiredFor: 'Food Certification', avatarBg: '#b2dfdb', avatarColor: '#004d40', status: 'Pending Review' },
    { id: 22, type: 'Application', initials: 'FS', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Fatima Silva', mobile: '+971-987654321', inquiredFor: 'Cosmetic Testing', avatarBg: '#ffecb3', avatarColor: '#ff6f00', status: 'Info Requested' },
    { id: 23, type: 'Application', initials: 'GT', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'George Thomas', mobile: '+1 (555) 555-5555', inquiredFor: 'Medical Device Approval', avatarBg: '#cfd8dc', avatarColor: '#263238', status: 'Pending Review' },
    // ... Add more applications (ids 14-20+)
  ];
  
  const   allMockApproved = [
      // Add ~10-20 diverse approved objects here
      { id: 101, type: 'Approved',  creatorName: 'Liam Ibrahim', companyName: 'Bass pro shops', logo: null, applicationNumber: 'A01234', date: '24/01/24', industry: 'Food', mobile: '+966534948187', status: 'Completed' },
      { id: 102, type: 'Approved',  creatorName: ' Ibrahim', companyName: 'Bab assalam', logo: null, applicationNumber: 'A01235', date: '25/01/24', industry: 'Food', mobile: '+966563912928', status: 'Completed' },
      { id: 103, type: 'Approved',  creatorName: 'Liam Ibrahim', companyName: 'Fourr', logo: null, applicationNumber: 'A01236', date: '26/01/24', industry: 'Cosmeceutical', mobile: '+966563912929', status: 'Completed' },
      { id: 104, type: 'Approved',  creatorName: 'Liam ', companyName: 'R365', logo: null, applicationNumber: 'A01237', date: '27/01/24', industry: 'Food', mobile: '+966565292109', status: 'Completed' },
      { id: 105, type: 'Approved',  creatorName: 'Michael Jones', companyName: 'Restaurant Depot', logo: null, applicationNumber: 'A01238', date: '28/01/24', industry: 'Cosmeceutical', mobile: '+966584414199', status: 'Completed' },
      // ... Add more approved items (ids 106-115+)
  ];
  

  const allMockAllocated = [
    // Allocated leads
    { ...allMockLeads[0], id: 201, type: 'Allocated Lead', allocatedTo: 'Member A', originalType: 'New Lead', mobile: '+91-9897765443', status: 'In Progress' }, // Added mobile/status for consistency
    { ...allMockLeads[2], id: 202, type: 'Allocated Lead', allocatedTo: 'Member B', originalType: 'New Lead', mobile: '+1 (555) 432-1098', status: 'Completed' },
    { ...allMockLeads[4], id: 203, type: 'Allocated Lead', allocatedTo: 'Member A', originalType: 'New Lead', mobile: '+1 (555) 456-7890', status: 'Pending' },
    // Allocated applications
    { ...allMockApproved[0], id: 301, type: 'Allocated Application', allocatedTo: 'Member C', originalType: 'Application' },
    { ...allMockApproved[2], id: 302, type: 'Allocated Application', allocatedTo: 'Member D', originalType: 'Application' },
    // Allocated approved items
    { ...allMockApproved[1], id: 401, type: 'Allocated Approved', allocatedTo: 'Member B', originalType: 'Approved' },
    { ...allMockApproved[3], id: 402, type: 'Allocated Approved', allocatedTo: 'Member C', originalType: 'Approved' },
    { ...allMockApproved[4], id: 403, type: 'Allocated Approved', allocatedTo: 'Member A', originalType: 'Approved' },
    { ...allMockApproved[1], id: 404, type: 'Allocated Approved', allocatedTo: 'Member B', originalType: 'Approved' },
    { ...allMockApproved[3], id: 405, type: 'Allocated Approved', allocatedTo: 'Member C', originalType: 'Approved' },
    { ...allMockApproved[4], id: 406, type: 'Allocated Approved', allocatedTo: 'Member A', originalType: 'Approved' },
    { ...allMockApproved[1], id: 407, type: 'Allocated Approved', allocatedTo: 'Member B', originalType: 'Approved' },
    { ...allMockApproved[3], id: 408, type: 'Allocated Approved', allocatedTo: 'Member C', originalType: 'Approved' },
    { ...allMockApproved[4], id: 409, type: 'Allocated Approved', allocatedTo: 'Member A', originalType: 'Approved' },
    { ...allMockApproved[1], id: 4010, type: 'Allocated Approved', allocatedTo: 'Member B', originalType: 'Approved' },
    { ...allMockApproved[3], id: 4011, type: 'Allocated Approved', allocatedTo: 'Member C', originalType: 'Approved' },
    { ...allMockApproved[4], id: 4012, type: 'Allocated Approved', allocatedTo: 'Member A', originalType: 'Approved' },
];
  
  // --- Mock Fetch Function ---
  
  export const fetchLeadCenterData = async ({
    mainTab,
    LeadsSubTabs,
    allocatedSubTab, // Added
    page = 1,
    itemsPerPage = 10,
    searchQuery = '',
    filters = {},
  }) => {
    console.log('API Call Simulated:', { mainTab, LeadsSubTabs, allocatedSubTab, page, itemsPerPage, searchQuery, filters });
    await new Promise(resolve => setTimeout(resolve, 500));
  
    let sourceData = [];
    // Determine base data source
    if (mainTab === 'Leads') {
      sourceData = allMockLeads.filter(item =>
        (LeadsSubTabs === 'New Leads' && item.type === 'New Lead') ||
        (LeadsSubTabs === 'Applications' && item.type === 'Application')
      );
    } else if (mainTab === 'Approved') {
      sourceData = allMockApproved;
    } else if (mainTab === 'Allocated') {
      // *** Filter allocated items based on the allocatedSubTab ***
      sourceData = allMockAllocated.filter(item =>
        (allocatedSubTab === 'Leads' && item.originalType === 'New Lead') ||
        (allocatedSubTab === 'Applications' && item.originalType === 'Application') ||
        (allocatedSubTab === 'Approved' && item.originalType === 'Approved')
      );
    }
  
    // Apply Search Filter (Adjust fields as needed)
     const filteredData = sourceData.filter(item => {
        const query = searchQuery.toLowerCase();
        if (!query) return true;
        const nameMatch = item.creatorName?.toLowerCase().includes(query);
        const companyMatch = item.companyName?.toLowerCase().includes(query);
        const mobileMatch = item.mobile?.toLowerCase().includes(query);
        const inquiredMatch = item.inquiredFor?.toLowerCase().includes(query);
        const appRefMatch = item.appRef?.toLowerCase().includes(query);
        const industryMatch = item.industry?.toLowerCase().includes(query);
        return nameMatch || companyMatch || mobileMatch || inquiredMatch || appRefMatch || industryMatch;
    });
  
    const totalItems = filteredData.length;
  
    // Apply Pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
  
    // *** UPDATED Counts ***
    const counts = {
        newLeads: allMockLeads.filter(lead => lead.type === 'New Lead').length,
        applications: allMockLeads.filter(lead => lead.type === 'Application').length,
        approved: allMockApproved.length,
        allocatedLeads: allMockAllocated.filter(item => item.originalType === 'New Lead').length,
        allocatedApplications: allMockAllocated.filter(item => item.originalType === 'Application').length,
        allocatedApproved: allMockAllocated.filter(item => item.originalType === 'Approved').length,
    };
  
    return {
        data: paginatedData,
        totalItems: totalItems,
        counts: counts,
    };
  };