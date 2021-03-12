import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getModalType,
  getSelectedTab,
  getShowActions,
} from '../purchaseSettingsSelector';
import { mainTabIds, mainTabItems } from '../tabItems';
import CancelModal from '../../../components/modal/CancelModal';
import PageView from '../../../components/PageView/PageView';
import PurchaseSettingsActions from './PurchaseSettingsActions';
import PurchaseSettingsEmailDetails from './PurchaseSettingsEmailDetails';
import PurchaseSettingsTemplateDetails from './PurchaseSettingsTemplateDetails';
import Tabs from '../../../components/Tabs/Tabs';
import modalTypes from '../modalTypes';

const PurchaseSettingsView = ({
  alert,
  loadingState,
  modalType,
  onCloseModal,
  onConfirmSwitchTab,
  onDismissAlert,
  saveEmailSettings,
  onUpdateEmailSettingsField,
  selectedTab,
  onTabSelect,
  showActions,
  exportPdf,
}) => {
  const Content = {
    [mainTabIds.templates]: PurchaseSettingsTemplateDetails,
    [mainTabIds.emailDefaults]: PurchaseSettingsEmailDetails,
  }[selectedTab];

  const contentProps = {
    [mainTabIds.templates]: { exportPdf },
    [mainTabIds.emailDefaults]: {
      onUpdateEmailSettingsField,
    },
  }[selectedTab];

  const saveHandler = {
    [mainTabIds.emailDefaults]: saveEmailSettings,
  }[selectedTab];

  const subHeadTabs = (
    <Tabs
      items={mainTabItems()}
      onSelected={onTabSelect}
      selected={selectedTab}
    />
  );

  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <>
      {modalType === modalTypes.SWITCH_TAB && (
        <CancelModal onCancel={onCloseModal} onConfirm={onConfirmSwitchTab} />
      )}
      <FormTemplate
        alert={alertComponent}
        pageHead="Purchases settings"
        sticky="none"
      >
        {subHeadTabs}

        <Content {...contentProps} />

        {showActions && (
          <PurchaseSettingsActions onSaveButtonClick={saveHandler} />
        )}
      </FormTemplate>
    </>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  modalType: getModalType(state),
  selectedTab: getSelectedTab(state),
  showActions: getShowActions(state),
});

export default connect(mapStateToProps)(PurchaseSettingsView);
