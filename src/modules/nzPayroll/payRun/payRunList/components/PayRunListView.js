import { Alert, Button, PageHead, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../payRunListSelectors';
import PageView from '../../../../../components/PageView/PageView';
import PayRunListFilterOptions from './PayRunListFilterOptions';
import PayRunListTable from './PayRunListTable';

const PayRunListView = (props) => {
  const {
    isLoading,
    alert,
    onSort,
    onDismissAlert,
    onCreatePayRun,
    onUpdateFilterBarOptions,
    onResetFilterBarOptions,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <PayRunListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
      onResetFilterBarOptions={onResetFilterBarOptions}
    />
  );

  const pageHead = (
    <PageHead title="Pay runs">
      <Button type="primary" onClick={onCreatePayRun}>
        Create pay run
      </Button>
    </PageHead>
  );

  const payRunListView = (
    <StandardTemplate
      alert={alertComponent}
      pageHead={pageHead}
      filterBar={filterBar}
      sticky="none"
    >
      <PayRunListTable onSort={onSort} />
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={payRunListView} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(PayRunListView);
