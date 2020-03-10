import {
  Button,
  Icons,
  PageState,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDefaultFilter, getIsTableEmpty, getIsTableLoading,
} from '../jobListSelector';
import JobListTableBody from './JobListTableBody';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import noResultStateImage from './no-results-state.svg';
import style from './JobListTable.module.css';

const noResultsPageState = (
  <PageState
    title="You haven't created any Jobs yet..."
    image={<img className={style.jobsNoResultImg} src={noResultStateImage} alt="No results found" />}
    actions={[
      <Button
        key={1}
        type="link"
        // onClick={onAddJobButtonClick}
        icon={<Icons.Add />}
      >
        Create Job
      </Button>,
    ]}
  />
);

const noFilteredResultsPageState = (
  <PageState
    title="No results found"
    description="Perhaps check spelling or remove filters and try again"
    image={<img className={style.jobsNoResultImg} src={noResultStateImage} alt="No results found" />}
  />
);

const emptyTableView = isDefaultFilters => (isDefaultFilters
  ? noResultsPageState
  : noFilteredResultsPageState);

const JobListTable = ({
  isTableEmpty,
  isTableLoading,
  tableConfig,
  isDefaultFilter,
}) => (
  <StickyTableBody
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyView={emptyTableView(isDefaultFilter)}
  >
    <JobListTableBody tableConfig={tableConfig} />
  </StickyTableBody>
);

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilter: getIsDefaultFilter(state),
});

export default connect(mapStateToProps)(JobListTable);
