import {
  Alert, FormTemplate, Spinner, Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlert,
  getIsLoading, getIsSubmitting, getPendingTab, getSelectedTab,
} from '../SalesSettingsDetailSelectors';
import { mainTabIds, mainTabItems } from '../tabItems';
import CancelModal from '../../../components/modal/CancelModal';
import SalesSettingsDetailActions from './SalesSettingsDetailActions';
import SalesSettingsEmailDetails from './SalesSettingsEmailDetails';
import SalesSettingsLayoutDetails from './SalesSettingsLayoutDetails';
import SalesSettingsPaymentsDetails from './SalesSettingsPaymentsDetails';
import SalesSettingsRemindersDetails from './SalesSettingsRemindersDetails';

const SalesSettingsDetailView = ({
  isLoading,
  isSubmitting,
  selectedTab,
  pendingTab,
  onDismissAlert,
  alert,
  onUpdateSalesSettingsItem,
  onSalesSettingsSave,
  onTabSelect,
  onModalConfirm,
  onModalCancel,
  onUpdateEmailSettings,
  onSaveEmailSettings,
}) => {
  const Content = {
    [mainTabIds.payments]: SalesSettingsPaymentsDetails,
    [mainTabIds.layoutAndTheme]: SalesSettingsLayoutDetails,
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

  const actions = (
    <SalesSettingsDetailActions
      onSaveButtonClick={saveHandler}
    />
  );

  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <React.Fragment>
      { pendingTab && (
        <CancelModal
          onConfirm={onModalConfirm}
          onCancel={onModalCancel}
          title="Cancel setting alterations"
          description="Are you sure you want to cancel the alterations for this setting?"
        />
      )}
      <FormTemplate
        alert={alertComponent}
        sticky="none"
        pageHead="Invoice and quote settings"
      >
        { subHeadTabs }
        <Content {...contentProps} />
        { selectedTab !== mainTabIds.reminders && actions }
      </FormTemplate>
    </React.Fragment>
  );

  return (isLoading || isSubmitting) ? <Spinner /> : view;
};

SalesSettingsDetailView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  alert: PropTypes.shape({}).isRequired,
  selectedTab: PropTypes.string.isRequired,
  pendingTab: PropTypes.string.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onUpdateSalesSettingsItem: PropTypes.func.isRequired,
  onSalesSettingsSave: PropTypes.func.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  onModalConfirm: PropTypes.func.isRequired,
  onModalCancel: PropTypes.func.isRequired,
  onUpdateEmailSettings: PropTypes.func.isRequired,
  onSaveEmailSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isSubmitting: getIsSubmitting(state),
  alert: getAlert(state),
  selectedTab: getSelectedTab(state),
  pendingTab: getPendingTab(state),
});

export default connect(mapStateToProps)(SalesSettingsDetailView);
