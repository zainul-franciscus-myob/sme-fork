import {
  Alert,
  Button,
  ButtonRow,
  FormTemplate,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsSubmitting,
  getLoadingState,
  getModal,
  getPageTitle,
  getSelectedTab,
} from '../businessSettingsSelectors';
import { mainTabIds, mainTabItems } from '../tabItems';
import BusinessDetailView from './BusinessDetailView';
import BusinessSettingsModal from './BusinessSettingsModal';
import GstSettingsView from './GstSettingsView';
import PageView from '../../../../components/PageView/PageView';

const BusinessSettingsView = ({
  alert,
  isSubmitting,
  loadingState,
  modal,
  onBusinessDetailsSave,
  onCancelButtonClick,
  onChange,
  onCloseFinancialYearModal,
  onConfirmCancel,
  onConfirmClose,
  onConfirmSave,
  onConfirmSwitchTab,
  onDismissAlert,
  onFinancialYearSettingsChange,
  onGstSettingsSave,
  onLockDateDetailChange,
  onOpenFinancialYearModal,
  onStartNewFinancialYear,
  onTabSelect,
  onUpdateGstSettings,
  pageTitle,
  selectedTab,
}) => {
  const Content = {
    [mainTabIds.businessDetails]: BusinessDetailView,
    [mainTabIds.gstSettings]: GstSettingsView,
  }[selectedTab];

  const contentProps = {
    [mainTabIds.businessDetails]: {
      onChange,
      onCloseFinancialYearModal,
      onFinancialYearSettingsChange,
      onLockDateDetailChange,
      onOpenFinancialYearModal,
      onStartNewFinancialYear,
    },
    [mainTabIds.gstSettings]: { onUpdateGstSettings },
  }[selectedTab];

  const saveHandler = {
    [mainTabIds.businessDetails]: onBusinessDetailsSave,
    [mainTabIds.gstSettings]: onGstSettingsSave,
  }[selectedTab];

  const subHeadTabs = (
    <Tabs
      items={mainTabItems}
      onSelected={onTabSelect}
      selected={selectedTab}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const actions = (
    <ButtonRow>
      <Button
        disabled={isSubmitting}
        name="cancel"
        onClick={onCancelButtonClick}
        type="secondary"
      >
        Cancel
      </Button>
      <Button
        disabled={isSubmitting}
        name="save"
        onClick={saveHandler}
        type="primary"
      >
        Save
      </Button>
    </ButtonRow>
  );

  const view = (
    <>
      {modal && (
        <BusinessSettingsModal
          modalType={modal.type}
          onConfirmCancel={onConfirmCancel}
          onConfirmClose={onConfirmClose}
          onConfirmSave={onConfirmSave}
          onConfirmSwitchTab={onConfirmSwitchTab}
        />
      )}
      <FormTemplate
        pageHead={pageTitle}
        actions={actions}
        alert={alertComponent}
      >
        {subHeadTabs}

        <Content {...contentProps} />
      </FormTemplate>
    </>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

BusinessSettingsView.defaultProps = {
  alert: undefined,
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  isSubmitting: getIsSubmitting(state),
  loadingState: getLoadingState(state),
  modal: getModal(state),
  pageTitle: getPageTitle(state),
  selectedTab: getSelectedTab(state),
});

export default connect(mapStateToProps)(BusinessSettingsView);
