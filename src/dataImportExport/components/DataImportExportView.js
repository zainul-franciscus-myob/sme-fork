import {
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getCurrentDataTypeInCurrentTab, getIsLoading, getIsSubmitting, getModalType,
} from '../selectors/DataImportExportSelectors';
import Alert from './Alert';
import DataImportExportActions from './DataImportExportActions';
import DataImportExportContent from './DataImportExportContent';
import DataImportExportTabs from './DataImportExportTabs';
import ImportConfirmModal from './ImportConfirmModal';
import PageView from '../../components/PageView/PageView';
import SmallScreenTemplate from '../../components/SmallScreenTemplate/SmallScreenTemplate';

const DataImportExportView = ({
  alert,
  modalType,
  isLoading,
  isSubmitting,
  isDataTypeSelectedForTab,
  onDismissAlert,
  onSelectTab,
  onSaveButtonClick,
  importChartOfAccountsListeners,
  onDataTypeChange,
  exportChartOfAccountsListeners,
}) => {
  const actions = isDataTypeSelectedForTab && (
    <DataImportExportActions
      onSaveButtonClick={onSaveButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert
      alert={alert}
      onDismissAlert={onDismissAlert}
    />
  );

  const modalComponent = modalType && (
    <ImportConfirmModal
      onCancel={importChartOfAccountsListeners.onCancelImportData}
      onConfirm={importChartOfAccountsListeners.onConfirmImportData}
    />
  );

  const view = (
    <SmallScreenTemplate>
      {alertComponent}
      <PageHead title="Import/Export data" />
      <DataImportExportTabs onSelectTab={onSelectTab} />
      {modalComponent}
      <DataImportExportContent
        onDataTypeChange={onDataTypeChange}
        importChartOfAccountsListeners={importChartOfAccountsListeners}
        exportChartOfAccountsListeners={exportChartOfAccountsListeners}
      />
      {actions}
    </SmallScreenTemplate>
  );

  return <PageView isLoading={isLoading} isSubmitting={isSubmitting} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isSubmitting: getIsSubmitting(state),
  isDataTypeSelectedForTab: getCurrentDataTypeInCurrentTab(state),
  alert: getAlert(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(DataImportExportView);
