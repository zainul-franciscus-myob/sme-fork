import { Button, ButtonRow, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading,
  getLoadingState,
} from '../../selectors/employmentClassificationListSelectors';
import EmploymentClassificationListFilterOptions from './EmploymentClassificationListFilterOptions';
import EmploymentClassificationListTable from './EmploymentClassificationListTable';
import PageView from '../../../../components/PageView/PageView';

const EmploymentClassificationListView = (props) => {
  const {
    isLoading,
    loadingState,
    pageHead,
    alert,
    tabs,
    listeners: {
      onCreateButtonClick,
      onUpdateFilterOptions,
      onResetFilterOptions,
      onApplyFilter,
      onSort,
      onClickRowButton,
    },
  } = props;

  const actions = (
    <ButtonRow>
      <Button onClick={onCreateButtonClick}>Create classification</Button>
    </ButtonRow>
  );

  const subHeadChildren = (
    <React.Fragment>
      {tabs}
      {actions}
    </React.Fragment>
  );

  const filterBar = (
    <EmploymentClassificationListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onResetFilterOptions={onResetFilterOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const view = (
    <EmploymentClassificationListTable
      onSort={onSort}
      onClickRowButton={onClickRowButton}
    />
  );

  return (
    <StandardTemplate
      sticky="none"
      pageHead={pageHead}
      alert={alert}
      subHeadChildren={subHeadChildren}
      filterBar={isLoading ? undefined : filterBar}
    >
      <PageView loadingState={loadingState} view={view} />
    </StandardTemplate>
  );
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(EmploymentClassificationListView);
