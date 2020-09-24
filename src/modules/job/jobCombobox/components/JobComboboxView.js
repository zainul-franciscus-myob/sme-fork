import { connect } from 'react-redux';
import React from 'react';

import {
  getIsJobLoading,
  getJobOptions,
  getLoadJobOptionsStatus,
} from '../JobComboboxSelectors';
import AutoCompleteCombobox from '../../../../components/AutoComplete/AutoCompleteCombobox';
import AutoCompleteComboboxTypes from '../../../../components/AutoComplete/AutoCompleteComboboxTypes';

const metaData = [
  {
    columnName: 'jobNumber',
    columnWidth: '13rem',
    showData: true,
    showPagination: true,
  },
  { columnName: 'jobName', columnWidth: '15rem' },
];

const JobComboboxView = ({
  jobModal,
  jobOptions,
  isLoading,
  loadJobOptionsStatus,
  addNewJobLabel,
  onLoadMore,
  onSearch,
  onAddNew,
  ...otherProps
}) => {
  const addNewJob = onAddNew ? { label: 'Create job', onAddNew } : undefined;

  return (
    <>
      {jobModal}
      <AutoCompleteCombobox
        type={AutoCompleteComboboxTypes.JOB_LINE}
        metaData={metaData}
        items={jobOptions}
        disabled={isLoading}
        allowClear
        loadMoreButtonStatus={loadJobOptionsStatus}
        onLoadMoreItems={onLoadMore}
        addNewItem={addNewJob}
        onSearch={onSearch}
        {...otherProps}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  jobOptions: getJobOptions(state),
  isLoading: getIsJobLoading(state),
  loadJobOptionsStatus: getLoadJobOptionsStatus(state),
});

export default connect(mapStateToProps)(JobComboboxView);
