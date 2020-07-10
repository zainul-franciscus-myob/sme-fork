import { Button, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDefaultFilter,
  getIsTableEmpty,
  getIsTableLoading,
} from '../jobListSelector';
import JobListTableBody from './JobListTableBody';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import emptyStateImage from './empty-state-jobs.svg';
import noResultStateImage from './no-results-found.svg';
import style from './JobListTable.module.css';

const emptyPageState = (onAddJobButtonClick) => (
  <PageState
    title="You haven't created any Jobs yet..."
    image={
      <img
        className={style.jobsNoResultImg}
        src={emptyStateImage}
        alt="No results found"
      />
    }
    actions={[
      <Button
        key={1}
        type="link"
        onClick={onAddJobButtonClick}
        icon={<Icons.Add />}
      >
        Create Job
      </Button>,
    ]}
  />
);

const noResultsPageState = (
  <PageState
    title="No results found"
    description="Perhaps check spelling or remove the filters and try again"
    image={
      <img
        className={style.jobsNoResultImg}
        src={noResultStateImage}
        alt="No results found"
      />
    }
  />
);

const emptyTableView = (isDefaultFilter, onAddJobButtonClick) =>
  isDefaultFilter ? emptyPageState(onAddJobButtonClick) : noResultsPageState;

const JobListTable = ({
  onAddJobButtonClick,
  isTableEmpty,
  isTableLoading,
  tableConfig,
  isDefaultFilter,
}) => (
  <StickyTableBody
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyView={emptyTableView(isDefaultFilter, onAddJobButtonClick)}
  >
    <JobListTableBody tableConfig={tableConfig} />
  </StickyTableBody>
);

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilter: getIsDefaultFilter(state),
});

export default connect(mapStateToProps)(JobListTable);
