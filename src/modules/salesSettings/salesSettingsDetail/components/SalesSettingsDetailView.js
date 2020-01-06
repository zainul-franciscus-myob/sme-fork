import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getIsSubmitting,
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
  isLoading,
  isSubmitting,
  selectedTab,
  showActions,
  modalType,
  onDismissAlert,
  alert,
  onUpdateSalesSettingsItem,
  onSalesSettingsSave,
  onTabSelect,
  onConfirmSwitchTab,
  onConfirmDeleteTemplate,
  onCloseModal,
  onUpdateEmailSettings,
  onSaveEmailSettings,
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
      selected={selectedTab}
      onSelected={onTabSelect}
    />
  );

  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <React.Fragment>
      {
        modalType && (
          <SaleSettingsModal
            modalType={modalType}
            onCloseModal={onCloseModal}
            onConfirmSwitchTab={onConfirmSwitchTab}
            onConfirmDeleteTemplate={onConfirmDeleteTemplate}
          />
        )
      }
      <FormTemplate
        alert={alertComponent}
        sticky="none"
        pageHead="Invoice and quote settings"
      >
        {subHeadTabs}
        <Content {...contentProps} />
        {showActions && (
          <SalesSettingsDetailActions onSaveButtonClick={saveHandler} />
        )}
      </FormTemplate>
    </React.Fragment>
  );

  return (
    <PageView isLoading={isLoading} isSubmitting={isSubmitting} view={view} />
  );
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isSubmitting: getIsSubmitting(state),
  alert: getAlert(state),
  selectedTab: getSelectedTab(state),
  showActions: getShowActions(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(SalesSettingsDetailView);