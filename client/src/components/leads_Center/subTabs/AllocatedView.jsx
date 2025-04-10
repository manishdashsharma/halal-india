// src/components/LeadCenter/AllocatedView.jsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { allocatedViewSubTabState, leadCenterDataViewState, leadCenterItemsPerPageState } from '../../../state/leadsCenterState';
import AllocatedSubTabs from './AllocatedSubTabs'; // Use the new sub-tabs
import Toolbar from '../common/Toolbar';
import DataTable, { AllocatedDataRow } from '../common/DataTable'; // Use AllocatedDataRow
import Pagination from '../common/Pagination';

const AllocatedView = () => {
  const { data, totalItems, isLoading, error } = useRecoilValue(leadCenterDataViewState);
  const itemsPerPage = useRecoilValue(leadCenterItemsPerPageState);
  const allocatedViewSubTab = useRecoilValue(allocatedViewSubTabState)

  // Define columns for the Allocated table (consistent across its sub-tabs for this example)
  const columns = [
     { key: 'icon', header: '#', headerClassName: 'w-12'},
     { key: 'primaryName', header: allocatedViewSubTab === 'Applications' ? 'Name' : 'Company Name'},
     { key: 'applicationNumber', header: 'App No.'},
     { key: 'date', header: 'Date'},
     { key: 'industry', header: 'Industry'},
     { key: 'mobile', header: 'Mobile Number'},
     { key: 'status', header: 'Status'},
     { key: 'actions', header: 'Actions', headerClassName: 'text-right'},
  ];

  const columnsLeads = [
    { key: 'icon', header: '#', headerClassName: 'w-12'},
    { key: 'primaryName', header: 'Name '},
    { key: 'mobile', header: 'Mobile Number'},
    { key: 'status', header: 'Status'},
    { key: 'actions', header: 'Actions', headerClassName: 'text-right'},
 ];

  return (
    <div>
      <AllocatedSubTabs /> {/* Render the sub-tabs */}
      <Toolbar searchPlaceholder="Search allocated items..." />
      <DataTable
        columns={allocatedViewSubTab=== 'Leads' ? columnsLeads : columns}
        data={data}
        isLoading={isLoading}
        error={error}
        RowComponent={AllocatedDataRow} // Use the specific row component for allocated items
      />
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default AllocatedView;