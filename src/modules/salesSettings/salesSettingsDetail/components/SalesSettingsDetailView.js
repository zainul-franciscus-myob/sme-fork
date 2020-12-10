import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getModalType,
  getSelectedTab,
  getShowActions,
} from '../SalesSettingsDetailSelectors';
import { mainTabIds, mainTabItems } from '../tabItems';
import PageView from '../../../../components/PageView/PageView';
import SaleSettingsModal from './SaleSettingsModal';
import SalesSettingsDetailActions from './SalesSettingsDetailActions';
import SalesSettingsEmailDetails from './SalesSettingsEmailDetails';
import SalesSettingsLayoutDetails from './SalesSettingsLayoutDetails';
import SalesSettingsPaymentsDetails from './SalesSettingsPaymentsDetails';
import SalesSettingsRemindersDetails from './SalesSettingsRemindersDetails';
import SalesSettingsTemplateDetails from './SalesSettingsTemplateDetails';
import Tabs from '../../../../components/Tabs/Tabs';

const SalesSettingsDetailView = ({
  alert,
  loadingState,
  modalType,
  onCloseModal,
  onConfirmDeleteTemplate,
  onConfirmSwitchTab,
  onDismissAlert,
  onSalesSettingsSave,
  onSaveEmailSettings,
  onSubscribeNowClick,
  onTabSelect,
  onUpdateEmailSettings,
  onUpdateSalesSettingsItem,
  selectedTab,
  showActions,
  templateHandlers,
}) => {
  const Content = {
    [mainTabIds.payments]: SalesSettingsPaymentsDetails,
    [mainTabIds.layoutAndTheme]: SalesSettingsLayoutDetails,
    [mainTabIds.templates]: SalesSettingsTemplateDetails,
    [mainTabIds.reminders]: SalesSettingsRemindersDetails,
    [mainTabIds.emailDefaults]: SalesSettingsEmailDetails,
  }[selectedTab];

  const contentProps = {
    [mainTabIds.payments]: {
      onUpdateSalesSettingsItem,
      onSubscribeNowClick,
    },
    [mainTabIds.layoutAndTheme]: {
      onUpdateSalesSettingsItem,
    },
    [mainTabIds.templates]: {
      templateHandlers,
    },
    [mainTabIds.emailDefaults]: {
      onUpdateEmailSettings,
    },
  }[selectedTab];

  const saveHandler = {
    [mainTabIds.payments]: onSalesSettingsSave,
    [mainTabIds.layoutAndTheme]: onSalesSettingsSave,
    [mainTabIds.emailDefaults]: onSaveEmailSettings,
  }[selectedTab];

  const subHeadTabs = (
    <Tabs
      items={mainTabItems}
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
      {modalType && (
        <SaleSettingsModal
          modalType={modalType}
          onCloseModal={onCloseModal}
          onConfirmDeleteTemplate={onConfirmDeleteTemplate}
          onConfirmSwitchTab={onConfirmSwitchTab}
        />
      )}
      <FormTemplate
        alert={alertComponent}
        pageHead="Sales settings"
        sticky="none"
      >
        {subHeadTabs}

        <Content {...contentProps} />

        {showActions && (
          <SalesSettingsDetailActions onSaveButtonClick={saveHandler} />
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

export default connect(mapStateToProps)(SalesSettingsDetailView);
