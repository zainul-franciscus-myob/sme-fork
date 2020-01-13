import {
  Alert,
  BaseTemplate,
  Card,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getMainTab,
  getModal,
  getPageHeadTitle,
} from '../EmployeeDetailSelectors';
import { mainTabItems } from '../tabItems';
import ConfirmModal from './ConfirmModal';
import EmployeeDetailActions from './EmployeeDetailActions';
import PageView from '../../../../components/PageView/PageView';

const EmployeeDetailView = ({
  tabViews,
  selectedTab,
  onMainTabSelected,
  loadingState,
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  alert,
  onDismissAlert,
  modal,
  confirmModalListeners,
  pageHeadTitle,
}) => {
  const subHeadTabs = (
    <Tabs
      items={mainTabItems}
      selected={selectedTab}
      onSelected={onMainTabSelected}
    />
  );

  const actions = (
    <EmployeeDetailActions
      onCancelButtonClick={onCancelButtonClick}
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modalComponent = modal && (
    <ConfirmModal
      modal={modal}
      confirmModalListeners={confirmModalListeners}
    />
  );

  const view = (
    <BaseTemplate>
      { alertComponent }
      <PageHead title={pageHeadTitle} />
      { subHeadTabs }
      { modalComponent }
      <Card body={tabViews[selectedTab].getView()} />
      { actions }
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  selectedTab: getMainTab(state),
  alert: getAlert(state),
  modal: getModal(state),
  pageHeadTitle: getPageHeadTitle(state),
});

export default connect(mapStateToProps)(EmployeeDetailView);
