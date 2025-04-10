import React from 'react';
import { useRecoilValue } from 'recoil';
import { leadCenterDataViewState, leadsViewSubTabState, leadCenterItemsPerPageState } from '../../../state/leadsCenterState';
import LeadsSubTabs from './LeadsSubTabs';
import Toolbar from '../common/Toolbar';
import DataTable, { LeadDataRow } from '../common/DataTable';
import Pagination from '../common/Pagination';

const LeadsView = () => {
  const { data, totalItems, isLoading, error } = useRecoilValue(leadCenterDataViewState);
  const itemsPerPage = useRecoilValue(leadCenterItemsPerPageState);
  const activeSubTab = useRecoilValue(leadsViewSubTabState);

  // Define columns based on sub-tab
  const columnsNewLead = [
         { key: 'avatar', header: '', headerClassName: 'w-12'},
         { key: 'name', header: 'Name'},
         { key: 'mobile', header: 'Mobile Number'},
         { key: 'inquiredFor', header: 'Inquired For'},
         { key: 'actions', header: 'Actions', headerClassName: 'text-right'},
  ];
  const columnsApplication = [
         { key: 'avatar', header: '', headerClassName: 'w-12'},
         { key: 'name', header: 'Name'},
         { key: 'application_Number' , header:'App. No'},
         { key: 'date' , header:'Date'},
         { key: 'industry' , header:'Industry'},
         { key: 'mobile', header: 'Mobile Number'},
         { key: 'status', header: 'Status'}, 
         { key: 'actions', header: 'Actions', headerClassName: 'text-right'},
  ];

  return (
    <div>
      <LeadsSubTabs />
      <Toolbar searchPlaceholder="Search leads or applications..." />
      <DataTable
        columns={activeSubTab ==='New Leads' ? columnsNewLead : columnsApplication}
        data={data}
        isLoading={isLoading}
        error={error}
        RowComponent={LeadDataRow} // Use the specific row component for leads
      />
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default LeadsView;