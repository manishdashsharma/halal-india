import { atom } from 'recoil';


// Atom for Lead Statistics
export const leadStatsState = atom({
    key: 'leadStatsState', // unique ID (with respect to other atoms/selectors)
    default: { // Default values, replace with fetched data later
      newLeads: { count: 256, change: 12, trend: 'up' },
      applications: { count: 112, change: 7, trend: 'down' },
      approved: { count: 72, change: 23, trend: 'up' },
      allocated: { count: 45, change: null, trend: null },
    },
  });
  
  // Atom for the list of New Leads
  export const newLeadsListState = atom({
    key: 'newLeadsListState',
    default: [{ id: 1, type: 'New Lead', initials: 'AK', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Atif khan', mobile: '+91-9897765443', inquiredFor: 'Halal certificate', avatarBg: '#d1c4e9', avatarColor: '#311b92', status: null },
      { id: 2, type: 'New Lead', initials: 'JB', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Jakob Bengson (Renewal)', mobile: '+1 (555) 876-5432', inquiredFor: 'Medical tourism assistance', avatarBg: '#c5cae9', avatarColor: '#1a237e', status: null },
      { id: 3, type: 'New Lead', initials: 'TC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Talan Curtis', mobile: '+1 (555) 432-1098', inquiredFor: 'Medical tourism assistance', avatarBg: '#bbdefb', avatarColor: '#0d47a1', status: null },
      { id: 4, type: 'New Lead', initials: 'KC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Kadin Ceildt', mobile: '+1 (555) 789-0123', inquiredFor: 'Halal certificate', avatarBg: '#dcedc8', avatarColor: '#33691e', status: null },
      { id: 5, type: 'New Lead', initials: 'AH', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Ahmed khan', mobile: '+1 (555) 456-7890', inquiredFor: 'Halal certificate', avatarBg: '#ffcdd2', avatarColor: '#b71c1c', status: null }, 
      { id: 11, type: 'New Lead', initials: 'AK', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Atif khan', mobile: '+91-9897765443', inquiredFor: 'Halal certificate', avatarBg: '#d1c4e9', avatarColor: '#311b92', status: null },
      { id: 12, type: 'New Lead', initials: 'JB', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Jakob Bengson (Renewal)', mobile: '+1 (555) 876-5432', inquiredFor: 'Medical tourism assistance', avatarBg: '#c5cae9', avatarColor: '#1a237e', status: null },
      { id: 13, type: 'New Lead', initials: 'TC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Talan Curtis', mobile: '+1 (555) 432-1098', inquiredFor: 'Medical tourism assistance', avatarBg: '#bbdefb', avatarColor: '#0d47a1', status: null },
      { id: 14, type: 'New Lead', initials: 'KC', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Kadin Ceildt', mobile: '+1 (555) 789-0123', inquiredFor: 'Halal certificate', avatarBg: '#dcedc8', avatarColor: '#33691e', status: null },
      { id: 15, type: 'New Lead', initials: 'AH', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Ahmed khan', mobile: '+1 (555) 456-7890', inquiredFor: 'Halal certificate', avatarBg: '#ffcdd2', avatarColor: '#b71c1c', status: null },
      { id: 16, type: 'New Lead', initials: 'JB', applicationNumber:'049' , data:'' , industry:'food' , creatorName: 'Jakob Bengson', mobile: '+1 (555) 876-5433', inquiredFor: 'Medical tourism assistance', avatarBg: '#c5cae9', avatarColor: '#1a237e', status: null },],
  });
  
  // Atom for Approved Applications (optional, if needed in this component)
  export const approvedApplicationsState = atom({
      key: 'approvedApplicationsState',
      default: [
        { id: 101, type: 'Approved',  creatorName: 'Liam Ibrahim', companyName: 'Bass pro shops', logo: null, applicationNumber: 'A01234', date: '24/01/24', industry: 'Food', mobile: '+966534948187', status: 'Completed' },
      { id: 102, type: 'Approved',  creatorName: ' Ibrahim', companyName: 'Bab assalam', logo: null, applicationNumber: 'A01235', date: '25/01/24', industry: 'Food', mobile: '+966563912928', status: 'Completed' },
      { id: 103, type: 'Approved',  creatorName: 'Liam Ibrahim', companyName: 'Fourr', logo: null, applicationNumber: 'A01236', date: '26/01/24', industry: 'Cosmeceutical', mobile: '+966563912929', status: 'Completed' },
      { id: 104, type: 'Approved',  creatorName: 'Liam ', companyName: 'R365', logo: null, applicationNumber: 'A01237', date: '27/01/24', industry: 'Food', mobile: '+966565292109', status: 'Completed' },
      { id: 105, type: 'Approved',  creatorName: 'Michael Jones', companyName: 'Restaurant Depot', logo: null, applicationNumber: 'A01238', date: '28/01/24', industry: 'Cosmeceutical', mobile: '+966584414199', status: 'Completed' },
      ],
  });