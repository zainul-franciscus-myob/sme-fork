import {
  Alert, BaseTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../LinkBillSelectors';
import LinkBillActions from './LinkBillActions';
import LinkBillDocumentView from './LinkBillDocumentView';
import LinkBillListView from './LinkBillListView';
import PageView from '../../../components/PageView/PageView';

const LinkBillView = ({
  alert,
  isLoading,
  onUpdateFilterOptions,
  onApplyFilters,
  onSort,
  onBillSelect,
  onCancelButtonClick,
  onLinkButtonClick,
  onDismissAlert,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const stickyComponents = (
    <div>
      {alertComponent}
      <PageHead title="Link to existing bill" />
    </div>
  );

  const view = (
    <BaseTemplate stickyHeaderChildren={stickyComponents}>
      <LinkBillDocumentView />
      <LinkBillListView
        onUpdateFilterOptions={onUpdateFilterOptions}
        onApplyFilters={onApplyFilters}
        onSort={onSort}
        onBillSelect={onBillSelect}
      />
      <LinkBillActions
        onCancelButtonClick={onCancelButtonClick}
        onLinkButtonClick={onLinkButtonClick}
      />
    </BaseTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(LinkBillView);
