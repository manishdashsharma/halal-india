import React from 'react';
import { useRecoilValue } from 'recoil';
import { leadCenterDataViewState, leadCenterItemsPerPageState } from '../../../state/leadsCenterState';
import Toolbar from '../common/Toolbar';
import DataTable, { ApprovedDataRow } from '../common/DataTable'; // Use ApprovedDataRow
import Pagination from '../common/Pagination';

const ApprovedView = () => {
  const { data, totalItems, isLoading, error } = useRecoilValue(leadCenterDataViewState);
  const itemsPerPage = useRecoilValue(leadCenterItemsPerPageState);

  // Define columns for the Approved table
  const columns = [
     { key: '#', header: '#'},
     { key: 'companyName', header: 'Company Name'},
     { key: 'applicationNumber', header: 'App No.'},
     { key: 'date', header: 'Date'},
     { key: 'industry', header: 'Industry'},
     { key: 'mobile', header: 'Mobile Number'},
     { key: 'status', header: 'Status'},
     { key: 'actions', header: 'Actions', headerClassName: 'text-right'},
  ];

  return (
    <div>
      {/* Toolbar might have different search/filter options for Approved view */}
      <Toolbar searchPlaceholder="Search approved applications..." />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        RowComponent={ApprovedDataRow} // Use the specific row component
      />
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default ApprovedView;