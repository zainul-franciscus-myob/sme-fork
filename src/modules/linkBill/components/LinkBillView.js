import {
  Alert, BaseTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getLoadingState } from '../LinkBillSelectors';
import LinkBillActions from './LinkBillActions';
import LinkBillDocumentView from './LinkBillDocumentView';
import LinkBillListView from './LinkBillListView';
import PageView from '../../../components/PageView/PageView';
import StickyHeader from '../../../components/Feelix/StickyHeader/StickyHeader';

const LinkBillView = ({
  alert,
  loadingState,
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
    <BaseTemplate>
      <StickyHeader>{stickyComponents}</StickyHeader>
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

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(LinkBillView);
